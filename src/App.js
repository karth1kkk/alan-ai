import React,{useState, useEffect} from "react";
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles'
import wordsToNumbers from 'words-to-numbers'

const alanKey = 'fdffbc967359fc96c7f2df6d06b563d22e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const [newsArticles, setNewsArticles] = useState([])
    const classes = useStyles()
    const [activeArticle, setActiveArticle] = useState(-1)

    useEffect(()=> {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newheadlines'){
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                } else if(command === 'highlight'){
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }else if(command === 'open'){
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), {fuzzy: true}) : number;
                  const article = articles[parsedNumber -1]

                  if(parsedNumber >20){
                    alanBtn().playText('Please try that again.')
                  }else if(article){
                    window.open(article[number].url, '_blank')
                    alanBtn().playText('Opening...')
                  }
                  
                }
            }
        })
    },[])

    return(
        <div>
            <div className={classes.logoContainer}>
              <img src="https://images.unsplash.com/photo-1633311905139-7b6088a69e33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" className={classes.alanLogo} alt="alanLogo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App