
This app is a an extension of the Spotify Web Playback SDK. To use the app you will need a premium Spotify account. 

Here is a test account that will be active for one month (started 04/12/2025)

```
chase.two.test.test@gmail.com
Password1!
```

To view:
1. Navigate to - [spotify-webapp-six.vercel.app](https://spotify-webapp-six.vercel.app/)
2. Use the above email to sign in.
3. Once prompted for pass code, select use password.
4. Enter the above password.
5. Dive in!

# Code

### Run Locally

```
git clone git@github.com:cheesecoke/spotify-webapp.git
//or
git clone https://github.com/cheesecoke/spotify-webapp.git

```

```
cd spotify-webapp
```

```
npm install
```

```
// create - .env
VITE_SPOTIFY_CLIENT_ID=bdaabeebc315426da5ddad8e201dbb5a
VITE_REDIRECT_TARGET=http://localhost:5173
```

```
npm run dev
```
Available at http://localhost:5173

### Storybook

```
npm run storybook
```
Typically available at http://localhost:6006”

### Stack
React, Vite, TanStack Query, Emotion, Storybook, Spotify Web API/SDK)

# Call outs

There is a script I used to create pages after deciding on a page structure. You can try out the script using this command:

```
node scripts/createPage.cjs
```

It has some casing issues in the App.tsx, but got the job done for creating pages quickly. It will create a directory with the name you choose. It will have options for layouts, which can be seen in storybook.

1. Responsive design was considered but there is still a lot of work.
2. Styles were copied from figma, which is not 1:1 - adjusted card size, fonts, some margin and padding.
3. Not all comments are my normal development practice, most would be a conversation or a ticket.
4. I direct a lot of links to PlayPage because of time. The podcast or show page is one I was able to spend more time getting closer to comps.
5. Chose to add navigation to all library pages.

Thank you, and enjoy!
