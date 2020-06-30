import React from 'react';
import { Typography, Divider } from '@material-ui/core';

const posts = [
  {
    "title": "Move to The Fifth Trooper subdomain",
    "date": "30 June 2020",
    "body": "Completed move to legionhq.thefifthtrooper.com. Dash was removed from name."
  },
  {
    "title": "List Templates are here",
    "date": "17 June 2020",
    "body": "When building a list you can now use a previously saved list as a template."
  },
  {
    "title": "Situational Awareness and Ascension Cable upgrades added.",
    "date": "16 June 2020",
    "body": "Also added special interaction between Sit. Awareness and unit with a Support rank."
  },
  {
    "title": "Randomly decided to add a dice roller",
    "date": "2 June 2020",
    "body": "Still needs a lot of work but the basics are there. Currently only does attack dice and doesn't count up results."
  },
  {
    "title": "Save + Fork button completed",
    "date": "28 May 2020",
    "body": "If logged in, lists can be created, updated, or forked."
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
        padding: '8px 32px'
      }}
    >
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
