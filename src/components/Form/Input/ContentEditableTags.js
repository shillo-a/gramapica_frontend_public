import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({

    
    contentContainer: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        
    },

    contentEditable: {
        padding: theme.spacing(1,2),
        outline: 'none',
        ...theme.typography.body2
    },

    // textInputContainer: {
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'top',
    // },

    // textInput: {
    //     padding: theme.spacing(1, 2),
    //     width: '100%',
    //     backgroundColor: theme.palette.background.paper,
    //     // borderRadius: 5,
    //     '&:hover': {
    //         outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.grey[500]}`,
    //         zIndex: 9999
    //     },
        
    // },
    
    // root: {
    //     outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.grey[100]}`
    // },

    // focused: {
    //     outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.primary.main} !important`,
    //     zIndex: 9999
    // },


}));

const ContentEditableTags = ({ tags, setTags }) => {

    const classes = useStyles();

    const tagsContent = tags && tags.map(item => (
        <Chip key={item}>{item}</Chip>
    ))

    const handleChange = (e) => {
        console.log(e)
    }

    return (
        <div className={classes.contentContainer}>
            <div
                className={classes.contentEditable}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={(e) => handleChange(e)}
            >
                {tagsContent}
            </div>
        </div>
               
    )
}

export default ContentEditableTags


{/* <Chip></Chip> */}
 {/* <TextInputPrimary
                    className={classes.textInput}
                    placeholder="Добавьте теги" 
                    noBorder={true}
                    value={currentArticleTags || ''}
                    onChange={(e) => {setCurrentArticleTags(e.target.value)}}
                /> */}