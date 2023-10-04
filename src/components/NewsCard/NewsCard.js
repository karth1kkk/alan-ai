import React, {useState, useEffect, createRef} from 'react'
import { Card, CardActions, CardActionArea, 
CardContent, CardMedia, Button, Typography } 
from '@mui/material'

import useStyles from './styles'
import classNames from 'classnames'


const NewsCard = ({article: {description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {

    const classes = useStyles()
    const [elRefs, setElfRefs] = useState([])
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop -50)

    useEffect(() =>{
        setElfRefs((refs)=> Array(20).fill().map((_,j)=> refs[j] || createRef()))

    }, [])

    useEffect(()=> {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard:null)}>
        <CardActionArea href={url} target='_blank'>
            <CardMedia className={classes.media} image={urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60'}/>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p' >
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary'>
                Learn more
            </Button>
            <Typography variant='h5' color="textSecondary">
                {i + 1}
            </Typography>
        </CardActions>
    </Card>
  )
}

export default NewsCard