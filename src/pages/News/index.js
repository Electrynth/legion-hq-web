import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import posts from './posts';

function Post({ title, date, body }) {
  return (
    <div>
      <Divider />
      <Typography variant="h6">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
      <Divider />
    </div>
  );
}

function News() {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        padding: '8px 24px'
      }}
    >
      <Alert variant="filled" severity="info" style={{ marginBottom: 16 }}>
        Key features before to be completed before deployment:
        <ul>
          <li>Cards page (card database viewer thing)</li>
          <li>Print List feature</li>
          <li>Save/Fork/Delete List features</li>
          <li>List template implementation</li>
        </ul>
      </Alert>
      <Typography variant="h4" style={{ marginBottom: 8 }}>
        Website Updates
      </Typography>
      {posts.map((post, i) => (
        <Post
          key={`${post.title}_${i}`}
          title={post.title}
          date={post.date}
          body={post.body}
        />
      ))}
    </div>
  );
};

/*
<div>
  <WidgetBot
    width={500}
    height={500}
    server="227631467532910602"
    channel="714567106620031076"
    shard="https://e.widgetbot.io"
  />
</div>
<div>
  <iframe
    width="350"
    height="500"
    frameBorder="0"
    title="Legion Discord"
    allowtransparency="true"
    src="https://discordapp.com/widget?id=227631467532910602&theme=dark&username="
  >
  </iframe>
</div>
*/

export default News;
