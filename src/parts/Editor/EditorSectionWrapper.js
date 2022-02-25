import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';

import { makeStyles } from '@material-ui/core'
import DragIndicatorRoundedIcon from '@material-ui/icons/DragIndicatorRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';

import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import { changeSection, deleteDraftArticleSection, selectPutDraftArticle, setChangeHappenedRightNow } from '../../store/slices/currentArticleSlice';
import { launchModal } from '../../store/slices/globalModalSlice';

import useDebounce from '../../utils/customHooks/useDebounce';

import LinkPrimary from '../../components/Link/LinkPrimary'
import QuoteSection from './QuoteSection';
import ImageSection from './ImageSection';
import SubheaderSection from './SubheaderSection';
import TextSection from './TextSection';
import SpoilerSection from './SpoilerSection';
import MarkerSection from './MarkerSection'
import { idle } from '../../utils/apis/config/statuses';
import { useDidUpdateEffect } from '../../utils/customHooks/useDidUpdateEffect';
import { isValueExists } from '../../utils/functions/isValueExists';

const useStyles = makeStyles((theme) => ({
    sectionContainer: {
        display: 'flex'
    },
    sectionLeftButtons: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '1.5rem'
    },

    dragButton: {
        cursor: 'move',
        color: 'grey'
    },

    feedShowButton: {
        color: 'grey'
    },


    deleteButton: {
        color: 'grey'
    },

    buttonIcon: {
        fontSize: '1rem'
    },

    sectionContent: {
        margin: theme.spacing(0, 1),
        flexGrow:1,
        minWidth: 0
        
    },
    sectionRightButtons: {
        minWidth: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
    }
}))

const EditorSectionWrapper = ({ index, section, provided }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Local state
    const [currentSection, setCurrentSection] = useState(section); // раньше тут было условие - || ''
    
    //Фиксируем, что прямо сейчас были изменения (пропускам initial render)
    useDidUpdateEffect(() => {
        dispatch(setChangeHappenedRightNow());
    }, [currentSection])
    
    //Управляем изменения иммутабельно через immer
    const handleHeaderChange = (header) => {

        setCurrentSection(produce(draftSection => {
            draftSection.header = header;
        }))  

    }

    const handleTextChange = (body) => {

        setCurrentSection(produce(draftSection => {
            draftSection.body = body;
        })) 

    }

    const handleFeedShow = () => {
        
        setCurrentSection(produce(draftSection => {
            draftSection.isFeedShow = !draftSection.isFeedShow; //toggle
        }))
 
    }

    const handleImageChange = ({ filename, description })  => {
        
        setCurrentSection(produce(draftSection => {
            const sectionImage = draftSection.sectionImage;
            if(isValueExists(filename)){sectionImage.filename = filename};
            if(isValueExists(description)){sectionImage.description = description};
        })) 

    }

    const handleQuoteChange = ({ body, personName, profession, avatarFilename }) => {

        setCurrentSection(produce(draftSection => {
            const sectionQuote = draftSection.sectionQuote;
            if(isValueExists(body)){sectionQuote.body = body};
            if(isValueExists(personName)){sectionQuote.personName = personName};
            if(isValueExists(profession)){sectionQuote.profession = profession};
            if(isValueExists(avatarFilename)){sectionQuote.avatarFilename = avatarFilename};
        })) 
        
    }

    const handleMarkerChange = ({ name, description, coordinateName, coordinateLatitude, coordinateLongitude, markerImageFilename, markerImageDescription }) => {

        setCurrentSection(produce(draftSection => {
            const sectionMarker = draftSection.sectionMarker;
            if(isValueExists(name)){sectionMarker.name = name};
            if(isValueExists(description)){sectionMarker.description = description};

            if(isValueExists(coordinateName)){sectionMarker.coordinate.name = coordinateName};
            if(isValueExists(coordinateLatitude)){sectionMarker.coordinate.latitude = coordinateLatitude};
            if(isValueExists(coordinateLongitude)){sectionMarker.coordinate.longitude = coordinateLongitude};

            if(isValueExists(markerImageFilename)){sectionMarker.markerImage.filename = markerImageFilename};
            if(isValueExists(markerImageDescription)){sectionMarker.markerImage.description = markerImageDescription};
        })) 
        
    }

    //Отложенная загрузка в Redux state
    const debouncedCurrentSection = useDebounce(currentSection, 1000);
    useEffect(()=>{
        if(section !== currentSection){
            dispatch(changeSection(currentSection))
        }
    },[debouncedCurrentSection])

    const handleDeleteSection = async () => {
        //Вызываем модальное окно для получения подтверждения
        const { payload: isConfirmed } = await dispatch(launchModal('deleteSection'));
        if(isConfirmed){
            dispatch(deleteDraftArticleSection({sectionId: section.id}))
        } 
    }

    return (
        <div className={classes.sectionContainer}>

            <div className={classes.sectionLeftButtons}>
                <LinkPrimary className={classes.dragButton}
                    {...provided.dragHandleProps}
                >
                    <DragIndicatorRoundedIcon className={classes.buttonIcon}/>
                </LinkPrimary>

                <LinkPrimary className={classes.feedShowButton}
                    onClick={handleFeedShow}
                    title={currentSection.isFeedShow ? 'Скрыть в ленте' : 'Вывести в ленте'}
                >
                    {currentSection.isFeedShow ? 
                        <StarRoundedIcon className={classes.buttonIcon}/> 
                        :
                        <StarOutlineRoundedIcon className={classes.buttonIcon}/>
                    }
                </LinkPrimary>
            </div>

            <div className={classes.sectionContent}>

                {section && section.typeName === 'subheader' ?
                    <SubheaderSection currentSection={currentSection} handleHeaderChange={handleHeaderChange}/>:<></>
                }

                {section && section.typeName === 'text' ?
                    <TextSection currentSection={currentSection} handleTextChange={handleTextChange}/>:<></>
                }

                {section && section.typeName === 'spoiler' ?
                    <SpoilerSection currentSection={currentSection} handleTextChange={handleTextChange}/>:<></>
                }

                {section && section.typeName === 'image' ?
                    <ImageSection currentSection={currentSection.sectionImage} handleImageChange={handleImageChange}/>:<></>
                }

                {section && section.typeName === 'quote' ?
                    <QuoteSection currentSection={currentSection.sectionQuote} handleQuoteChange={handleQuoteChange}/>:<></>
                }

                {section && section.typeName === 'marker' ?
                    <MarkerSection currentSection={currentSection} handleMarkerChange={handleMarkerChange}/>:<></>
                }
                
            </div>

            <div className={classes.sectionRightButtons}>
                <LinkPrimary 
                    className={classes.deleteButton}
                    onClick={handleDeleteSection}
                >
                    <ClearRoundedIcon className={classes.buttonIcon}/>
                </LinkPrimary>
                {/* <LinkPrimary 
                    className={classes.deleteButton}
                    // onClick={handleDeleteSection}
                >
                    <StarRateRoundedIcon className={classes.buttonIcon}/>
                </LinkPrimary> */}
            </div>

        </div>
    )
}

function checkEquality(prevProps, nextProps){
    //Изменения в родительском State не важны! 
    //Текущее состояние компонента отражает то, что происходит в state Родителя
    //Но необходимо отслеживать, как изменилось положение текущего компонента относительно других
    return prevProps.index === nextProps.index
}

export default React.memo(EditorSectionWrapper, checkEquality);

        
        //without immer
        // setCurrentSection(prevState => {
        //     return {...prevState, header}
        // })

        //with immer (long)
        // setCurrentSection(prevState => {
        //     return produce(prevState, draft => {
        //         const section = draft;
        //         section.header = header;
        //     })
        // })

        //with immer (short) //curried producers