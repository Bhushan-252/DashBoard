"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { userId } = useParams();
  const [error, setError] = useState();
  useEffect(() => {
    fetch(`/api/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsHydrated(true);
      }).catch((err)=>{
          setError(error);
      });
  }, []);
  if (error) throw error;
  if (!isHydrated)
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
     
  return (
    <div>
      {posts?.map((post) => {
        return (
          <Accordion key={post.id} className="my-1 px-1">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="h2" variant="h6">
                {post.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>{post.body}</p>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default Posts;
