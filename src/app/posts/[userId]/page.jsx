'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

function Posts() {
  const [posts,setPosts] = useState([]);
  const {userId} = useParams()
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res => res.json())
    .then(data => setPosts(data))
  },[])
  return (
    <div>
      {
        posts?.map((post) => {
          return   <Accordion key={post.id} className="my-1 px-1">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="h2" variant="h6" >{post.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>{post.body}</p>
            </AccordionDetails>
          </Accordion>

        })
      }

    </div>
  )
}

export default Posts