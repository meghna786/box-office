import React from 'react';
import { RadioWrapper } from './CustomRadio.styled';

const CustomRadio = ({ label, ...restprops }) => {
    return (
        <RadioWrapper htmlFor={restprops.id}>
            {label}
            <input {...restprops} type="radio"/>
            <span />
        </RadioWrapper>
    );
};

export default CustomRadio;
