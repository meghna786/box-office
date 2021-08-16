// for favouring and unfavouriting
import { useEffect, useReducer, useRef, useState } from 'react';
import { getAPI } from './config';

function showsReducer(initialShowsState = [], action) {
    switch (action.type) {
        case 'ADD':
            return [...initialShowsState, action.showID];
        case 'REMOVE':
            return initialShowsState.filter(showID => showID !== action.showID);
        default:
            return initialShowsState;
    }
}

function usePersistedReducer(reducer, initialState, key) {
    const [state, dispatch] = useReducer(reducer, initialState, prevState => {
        const DataFromLocalStorage = localStorage.getItem(key);
        return DataFromLocalStorage
            ? JSON.parse(DataFromLocalStorage)
            : prevState;
        // json parse becoz in local storage data is always storerd as strings...so we need to cgnage it to object.
    });

    // for updating local storage everytime state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, dispatch];
    // since its a custom useReducer hook.... it must also return state and disptach
}



export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
}



// for persisitence of data in input bar
export function UseLastQuery(key='lastQuery'){
    const [input,setInput]=useState(()=>{
        const PersistedDataFromSessionStorage = sessionStorage.getItem(key);
        return PersistedDataFromSessionStorage
            ? JSON.parse(PersistedDataFromSessionStorage)
            : '';
    });
    const setPersistedInput=newState=>{
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    }

    return [input, setPersistedInput];
}

// creating a hook for reusing the logic of hooks in show.js

const Reducer = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...prevState,
                show: action.show,
                isLoading: false,
                error: null,
            };
        case 'FETCH_FAILED':
            return {
                ...prevState,
                error: action.error,
                isLoading: false,
            };
        default:
            return prevState;
    }
};


export function useShow(showId){
    const [state, dispatch] = useReducer(
        Reducer,
        {
            show: null,
            isLoading: true,
            error: null,
        }
    );
    //     const [show, setShow] = useState(null);
    //     const [isLoading, setLoading] = useState(true);
    //     const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        // because this getAPI then is async action so even after we go to next page react still tries to update the state.....when we switch pages our component is unMounted but react does not know about it  ...therefore we create  isMounted... if its true then only we show results.(we use CleanUp function for this)
        getAPI(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
            .then(data => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_SUCCESS', show: data });
                }
            })
            .catch(err => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_FAILED', error: err.message });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [showId]);

    return state;
}






// hook

export function useWhyDidYouUpdate(name, props) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef();
    useEffect(() => {
      if (previousProps.current) {
        // Get all keys from previous and current props
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        // Use this object to keep track of changed props
        const changesObj = {};
        // Iterate through keys
        allKeys.forEach((key) => {
          // If previous is different from current
          if (previousProps.current[key] !== props[key]) {
            // Add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        });
        // If changesObj not empty then output to console
        if (Object.keys(changesObj).length) {
          console.log("[why-did-you-update]", name, changesObj);
        }
      }
      // Finally update previousProps with current props for next hook call
      previousProps.current = props;
    });
  }