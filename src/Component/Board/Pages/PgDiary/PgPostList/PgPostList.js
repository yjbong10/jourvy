import React, { Fragment, useState } from 'react'
import { withRouter } from "react-router";
import PostDate from './PostDate/PostDate';
import PostCard from './PostCard/PostCard';
import PostDelimiter from './PostDelimiter/PostDelimiter';
import PostEnd from './PostEnd/PostEnd';
import { useEffect } from 'react';

const PgPostList = (props) => {
  //clone all posts from reducer into FilterPost
  //return FilterPost when user click filtermonth else return original posts
  const [FilterPost, setFilterPost] = useState([...props.posts]) 

  //this is to filter post by search Input
  const { searchInput } = props
  useEffect(() => {
    if(searchInput) {
      setFilterPost(FilterPost.filter(post => {
        const titleResult = post.title.toLowerCase().indexOf(searchInput.toLowerCase()) //tolowercase makesure it match regardless of case
        const teaserResult = post.teaser.toLowerCase().indexOf(searchInput.toLowerCase())
        const result = titleResult !== -1 || teaserResult !== -1 
        //-1 means not match, if match it will shows the index of match character
        return result
      }))
    }
    // eslint-disable-next-line
  }, [searchInput])


  //MonthFilter set to true fisrt so that when user click delimeter it will start filter
  //use in conjuntion with onMonthFilter function below
  const [MonthFilter, setMonthFilter] = useState(true)  


  // clone post to new Array and added a delimeter element between two element that has diffrente month 
  // eg:(March 2020) 
  let postArr = []; 
  let prev = null; // used to seperate element by comparing its month to prev month
  for (let key of FilterPost){ 
    if (!prev){
      prev = key.month //if there was no prev then its month set to prev and push
      postArr.push({delimeter: true, month: key.month, year: key.year, id: Math.random()})
      postArr.push(key)
    } else if(prev === key.month){ //if prev month same as current month, just push
      postArr.push(key)
    } else { //if prev month not same as current month, its month set to prev and push
      prev = key.month 
      postArr.push({delimeter: true, month: key.month, year: key.year, id: Math.random()}) 
      postArr.push(key)
    }
  }



  //v// render a delimeter when an item in postArr has a delimeter key (refer to above)
  const postList = postArr.map((item) => { 

    //v// this is all for searching purpose
    let postTitle = item.title
    let postTeaser = item.teaser
    if(searchInput && item.title && item.teaser) { //include title and teaser to make sure they are not undifiend

      //find the index of match character, for slice later
      //lowercase is to make sure everything will match regardless of case
      const titleIndex = item.title.toLowerCase().indexOf(searchInput.toLowerCase()) 
      const teaserIndex = item.teaser.toLowerCase().indexOf(searchInput.toLowerCase())

      if(titleIndex !== -1) { //this mean if title match search Input
        const matchLength = searchInput.length + titleIndex // need to + titleIndex because need to know how many character is matched from the titleIndex
        const slice = item.title.slice(titleIndex, matchLength) // this is just how slice works eg:(1, 4), from index 1 to index 4 - 1
        postTitle = item.title.replace(slice, `<span>${slice}</span>`) // this is to replace match characters to add style on it
      }
      if(teaserIndex !== -1) {
        const matchLength = searchInput.length + teaserIndex
        const slice = item.teaser.slice(teaserIndex, matchLength)
        postTeaser = item.teaser.replace(slice, `<span>${slice}</span>`)
      }
    }
    //^// this is all for searching purpose

    return (
      <Fragment key={item.id}>
        {(item.hasOwnProperty('delimeter')) 
          ? <PostDelimiter 
              month={item.month} 
              year={item.year} 
              key={item.id} 
              clicked={() => onMonthFilter(item.month)}/>
          : <>
              <PostDate day={item.date} month={item.day}/>
              <PostCard 
              id={item.id}
              title={postTitle}
              content={postTeaser} 
              />
            </>
        }
      </Fragment>
    )
  })
  //^// render a delimeter when an item in postArr has a delimeter key (refer to above) 



  //use in conjuntion with MonthFilter useState above
  function onMonthFilter(month){
    //MonthFilter was set to true initially, so it will return filter posts on users first click
    if (MonthFilter){
      setFilterPost(FilterPost.filter(item => {
        return item.month === month
      }))
    } else {
      setFilterPost(props.posts)
    }
    //toggler MonthFilter to false after done so that next time clicked return original posts
    setMonthFilter(!MonthFilter)
  }



  let postEnd = <PostEnd status="No more posts"/>
  if (props.posts.length === 0){ postEnd = <PostEnd status="No posts" {...props}/>}
  if (props.isLoad) { postEnd = <PostEnd status="Loading..." {...props}/> }
  
  return (
    <> 
      {postList}
      {postEnd}
    </>
  )
}

export default withRouter(PgPostList)
