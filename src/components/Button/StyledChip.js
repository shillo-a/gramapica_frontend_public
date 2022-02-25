import React from 'react';
import PropTypes from 'prop-types';
import MaterialChip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const Chip = (props) => {
    const StyledChip = withStyles({
        root: {
            'color': 'white',
            'backgroundColor': `${props.color} !important`,
            '&:hover': {
                backgroundColor: props.color,
                filter: 'brightness(120%)',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: props.color,
                borderColor: props.color,
            },
        },
        outlined: {
            color: props.color,
            border: `1px solid ${props.color}`,
            backgroundColor: `transparent !important`,
        },
        icon: {
            color: props.variant === 'outlined' ? props.color : 'white',
        },
        deleteIcon: {
            color: props.variant === 'outlined' ? props.color : 'white',
        },
    })(MaterialChip);

    return <StyledChip {...props} />;
};

Chip.propTypes = {
    color: PropTypes.string,
    variant: PropTypes.oneOf(['regular, outlined']),
};

export default Chip;