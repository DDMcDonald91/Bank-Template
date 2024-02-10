import React from 'react'
import {Helmet} from "react-helmet";


export default function SEO(props) {
  return (
    <>
    <Helmet>
        <meta 
            charSet="utf-8" 
            name='description'
            content={props.content}
        />
        <meta
        name="keywords"
        content={props.keywords}
        />
        <title>{props.title}</title>
        <link rel="canonical" href={props.page} />
    </Helmet>
    </>
  )
}
