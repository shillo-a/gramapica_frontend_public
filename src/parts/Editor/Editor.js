import { Grid, makeStyles } from '@material-ui/core'
import React, { useState, useEffect, useRef} from 'react'
import EditorSectionWrapper from './EditorSectionWrapper';
import AddSectionMenu from './AddSectionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { launchModal } from '../../store/slices/globalModalSlice';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import HeaderSection from './HeaderSection';
import { changeSectionPosition, catchDraftArticleChanges, getDraftArticle, putDraftArticle, selectCurrentArticleSections } from '../../store/slices/currentArticleSlice';
import TagsSection from './TagsSection';
import useDebounce from '../../utils/customHooks/useDebounce';
import useMountFinished from '../../utils/customHooks/useMountFinished';
import { createRandomId } from '../../utils/functions/createRandomId';
import RegionsSection from './RegionsSection';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        
    },

    editorSections: {
        marginBottom: theme.spacing(2)
    },

    sectionGridWrapper: {

        // display: 'block',
        // position: 'relative',
        // top: `calc(${theme.navbarHeight}px + ${theme.spacing(1)}px) !important`,
        // visibility: 'hidden',
        // position: 'relative',
        // top: `calc(${theme.navbarHeight}px + ${theme.spacing(1)}px) !important`
        //Необходимо для корректной отработки HashLink
        // paddingTop: `calc(${theme.navbarHeight}px + ${theme.spacing(1)}px) !important`,
        // marginTop: `calc(-1 * (${theme.navbarHeight}px + ${theme.spacing(1)}px)) !important`,
    }
}))

const Editor = ({ currentArticle }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Выполняем событие, когда завершается перемещение секции
    const onDragEndHandler = (result) => {
        const { destination, source, draggableId } = result

        // Выбросили draggable за зону droppable
        if(!destination){
            return
        }

        //Положение draggable не изменилось
        if(
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ){
            return
        }

        //Положение draggable изменилось
        dispatch(changeSectionPosition({sourceIndex: source.index, destinationIndex: destination.index}))
    }


    return (
        <div className={classes.wrapper}>

            <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId={'1'}>
            {(provided, snapshot) => (
                <div 
                    className={classes.editorSections}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                <Grid container spacing={1}>
   
                    <Grid item xs={12}>
                        <HeaderSection currentArticleName={currentArticle?.name || ''}/>
                    </Grid>

                    {currentArticle.sections?.map((item, index) => (
                            
                            <Draggable
                                draggableId={String(item.id)}
                                index={index}
                                key={item.id}
                                
                            >
                                {(provided) => (
                                    <Grid item xs={12} 
                                        className={classes.sectionGridWrapper}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        id={`${item.id}editor`}
                                    >
                                    <EditorSectionWrapper 
                                        index={index}
                                        section={item}
                                        provided={provided}
                                    />
                                    </Grid>
                                )}
                            </Draggable>
                            
                        )
                    )}

                    {provided.placeholder} 

                    {/* <Grid item xs={12}> 
                    <AddSectionMenu/>
                    </Grid> */}
                   
                    <Grid item xs={12}> 
                        <TagsSection currentArticleTags={currentArticle?.tags || []}/>
                    </Grid>

                    <Grid item xs={12}> 
                        <RegionsSection currentArticleRegions={currentArticle?.regions || []}/>
                    </Grid>

                </Grid>
                </div>
            )}
            </Droppable>
            </DragDropContext>
            
            <AddSectionMenu/>
        </div>
    )
}

export default Editor
