import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const posts = [
  {
    "title": "Save Button completed",
    "date": "28 May 2020",
    "body": "If logged in, lists can be created or updated."
  },
  {
    "title": "URL Export completed",
    "date": "27 May 2020",
    "body": "URL export is complete-ish but requires more testing with loadout+counterpart and upgrades that add a slot."
  },
  {
    "title": "Login enabled and Discord integration",
    "date": "25 May 2020",
    "body": "Lists from the Heroku app can now be accessed. Small Discord widget that has invite to Legion Discord added."
  },
  {
    "title": "Link posted on Heroku app",
    "date": "24 May 2020",
    "body": "The goal is to get more people to start testing the main new stuff like Counterparts and Loadout."
  }
]

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
          <li>Print List button</li>
          <li>Fork List button</li>
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
