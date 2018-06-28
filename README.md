# React Styling

This tutorial shall demonstrate, which styling patterns are possible - to make a decision easier about which styling pattern (strategy) to take.

Thoughts:

- The right styling strategy (or combination of!) always depends on your own individual needs.
- Dynamic Styling (as a function of state or screen size) is great for Responsive and Interactive Design. 
- Cons / Pros of classic CSS/Sass Styling compared to JS Styling

    - Cons:
        1. New animation libraries like
        
            - ReactTransitionGroup (https://github.com/reactjs/react-transition-group)
            - React Motion (https://github.com/chenglou/react-motion)
            - React Move (https://react-move.js.org/#/)
            - React Router Transition (https://github.com/maisano/react-router-transition) 
            
            will probably be faster integrated with JS Styling than integrating these animations with classic CSS/Sass Styling.
        2. The DOM will not be as clean as when using JS Styling because React does NOT KNOW about elements hidden or shown through CSS classes. Elements would be entirely removed through React instead of hiding them.
        3. Animation libraries as an additional JS layer can easier orchestrate your CSS animations (like transition timings, event timings). 
    - Pros:
        1. You don't have to switch to camelCase notation of style properties and you of course don't have styling within your JSX files, but separate in a CSS file.
        2. Pure CSS experts can still work within a React Team without knowing much about JavaScript and how React really works.
       
All 6 strategies are implemented independent from each other and you can simply try out the 6 examples.

## Table of Contents

1. [Getting Started](#chapter1)
2. [Styling Strategies](#chapter2)
    1. [Styling with global CSS](#chapter2a)
    2. [Styling inline for Dynamic Styling](#chapter2b)
    3. [Styling inline advanced with Radium](#chapter2c)
    4. [Styling at Component Level Scope with JS](#chapter2d)
    5. [Styling at Component Level Scope with CSS](#chapter2e)
    6. [Styling with global Sass](#chapter2f)
3. [Links](#chapter3)


## <a id="chapter1"></a>1. Getting Started


*Notes:*

- No Mac needed.
- In case of the last example, the global Sass strategy, you eventually need to install Ruby on Rails (http://guides.rubyonrails.org/getting_started.html) before installing Ruby Sass. `node-sass` was no option as it had several vulnerabilities (not severe, but still).


### My Setup

This tutorial was created using

- Mac OS X version High Sierra, 10.13.4 (`sw_vers`) 
- Node.js version v9.11.1 (`node -v`)
- Ruby Sass 3.5.6 (`sass -v`)
- Boostrap CSS, version v4.0.0-alpha.2 (`bootstrap.min.css`): We just use classes `card-block, card-title, card-text, btn, btn-primary` to make the cards look ok without big effort.
  
### Node.js installed ?

If you haven't Node.js installed on your machine, please install current (latest), OR LTS version of Node.js ([By download](https://nodejs.org/en/download/), [By package manager](https://nodejs.org/en/download/package-manager/)).

*Note: LTS version is more stable and must be sufficient for this tutorial.*

This will install Node.js (JavaScript engine) on your machine, and allows JavaScript code to execute not only in your browser.
Node.js also ships with npm package manager we will need below.


### Clone this repo into your preferred projects directory

Open a Terminal window and cd into your preferred projects directory, then run:

```
> git clone https://github.com/herrkraatz/react-styling.git
```

When repo cloned successfully, cd into the styling strategy you want to try out (e.g. `cd 00-styling-with-global-css`) and run `npm install`

```
> cd 00-styling-with-global-css
> npm install
```

... when done:

### Testing development code

```
> npm run dev
```

Open `http://127.0.0.1:8080/` or `http://localhost:8080/` in your browser. 

This should show a list of users downloaded from `https://jsonplaceholder.typicode.com/users`.


### Testing production ready code

If you want to make it production ready, run:

```
> npm run prod
```

To test the production code/bundle, you can do the following:

1. Install a command-line http-server, preferably globally to use it in other directories as well: https://github.com/indexzero/http-server

    ```
    > npm install http-server -g
    ```
    
    Eventually you need to use sudo `sudo npm install http-server -g`

2. CD into the dist folder and run the just installed command-line http-server

    ```
    > cd dist
    > http-server -o
    ```
    
    `-o` opens the app in your default browser automatically under `http:127.0.0.1:8080` 

### bundle.js file size

The bundle.js (100 - 200 KiB) is pretty big, but there are ways out: 
- Lazy loading of files that are NOT needed while very first rendering the application in the browser (keep TTIF, Time To First Bite, definately below 300 ms). Check out https://webpack.js.org/guides/code-splitting/
- Server Side Rendering to first load static HTML & CSS into the browser so the user has something to do for some seconds while, in parallel, the application (React framework & code) is loaded into the browser and, when done, gets hydrated (merged) into the initially loaded (server side rendered) HTML & CSS.

Eventually PREACT (https://preactjs.com/) might be of help (They say: "Fast 3kB alternative to React with the same modern API.")


## <a id="chapter2"></a>2. Let's dive into different ways of styling

Again, cd into the example you like to try out and run `npm install` and, when done: `npm run dev`:

```
> cd 00-styling-with-global-css
> npm install
> npm run dev
```

We basically only play with these files: 

- `src/components/user_list.js` file
- `src/components/app.js` file (within 02-styling-inline-advanced-with-radium and 03-styling-at-component-level-scope-with-js)
- `style/styles.css` file
- `style/sass` folder (within 05-styling-with-global-sass only)


## <a id="chapter2a"></a>i. Styling with global CSS

This example is just there to show that you can use global CSS (`in style folder`) within any React App by just 
adding it to the index.html:

```
<link rel="stylesheet" href="/style/bootstrap.min.css">
<link rel="stylesheet" href="/style/styles.css">
```
    
BUT: In case of `class` attribute: You have to use `className` instead of `class` (`id` works without any changes) in the React component:

`user_list.js`:

```
<div className="card card-block">
    <h4 className="card-title">{user.name}</h4>
    <p className="card-text">{user.company.name}</p>
    <a className="btn btn-primary">{user.email}</a>
</div>
```

Further reading about attributes and properties: https://reactjs.org/docs/dom-elements.html

## <a id="chapter2b"></a>ii. Styling inline for Dynamic Styling

Everything is JavaScript !!

So you can take advantage of it during runtime of your React application:

### You can set inline styles dynamically (inline styles overwrite classes, as usually)

`user_list.js`:

Setting initial inline style object (static in our case as we define it within our Component and need it globally within the Component, reachable as `UserList.style`):

```
static style = {
    color: 'red',
    fontStyle: 'italic'
};
```

During runtime, an event may occur to change inline style's color from red to green ...

```
if(this.props.users.length > 5){
    UserList.style.color = 'green';
}
```

On every re-render React applies the actual style property `UserList.style`:

```
renderUser(user) {
    return (
        <div className="card card-block" style={UserList.style}>
            <h4 className="card-title">{user.name}</h4>
            <p className="card-text">{user.company.name}</p>
            <a className="btn btn-primary">{user.email}</a>
        </div>
    );
}
```

The style attribute needs variable type object.


### You can set classes dynamically, too ! 

*Note: Again we use classes from global CSS file `style/styles.css`*

`user_list.js`:

Setting initial class `user-list` for the `div`:

```
const classes = ['user-list'];
```

During runtime, an event may occur to add/remove a class from the `div`:

```
if(this.props.users.length > 5){
    classes.push('green-bg'); // classes = ['user-list', 'green-bg']
}
```

On every re-render React calls `classes.join(' ')` for us, to figure out the current classes needed by the `div`.

`classes.join(' ')` results in e.g. `"user-list green-bg"`

```
return (
    <div className={classes.join(' ')}>
        {this.props.users.map(this.renderUser)}
    </div>
);
```

The className attribute needs variable of type string.

Again further reading: https://reactjs.org/docs/dom-elements.html


## <a id="chapter2c"></a>iii. Styling inline advanced with Radium

The problem with inline styling WITHOUT Radium (https://github.com/FormidableLabs/radium):
 
You can't use

- Pseudo Selectors (like `:hover`)

- Media Queries (like `@media (min-width: 500px)`)

To make it work, we need to do two things:
 
- Install Radium:

    ```
    > npm install --save radium
    ```
    
- Connect Radium to React:
    - Child Component `user_list.js`: 
        - Import Radium library: `import Radium from 'radium';`
        - Wrap Radium around the child component: `export default (Radium(UserList));` 
    - Parent Component `app.js`:
        - Import Radium library and StyleRoot: `import Radium, { StyleRoot } from 'radium';`
        - Wrap StyleRoot around the child component: 
        
            ```
            <StyleRoot>
                <UserList/>
            </StyleRoot> 
            ```
      
        - Wrap Radium around the parent component: `export default Radium(App);` 
        
That's quite a bit of work ...

Ok, in our example code we can then add Pseudo Selectors and Media Queries:

`user_list.js`:

```
static style = {
    color: 'red',
    fontStyle: 'italic',
    // Pseudo selector possible through Radium
    ':hover': {
        color: 'orange'
    },
    // Media Queries possible through Radium
    '@media (min-width: 500px)': {
        color: 'blue',
        fontStyle: 'normal'
    }
};
```

Radium inline styles can also be overwritten of course (it's just a JavaScript object):

```
if(this.props.users.length > 5){
    UserList.style.color = 'green';
    // Radium style
    UserList.style[':hover'] = {
        color: 'brown'
    };
}
```    

## <a id="chapter2d"></a>iv. Styling at Component Level Scope with JS

Next we talk about Styled Components: 

- They are written in JavaScript, using a very similar notation as CSS, but style properties are in camelCase.
- They act as a wrapper / container for your content / other components.

### How to install:

```
> npm install --save styled-components
```

### Now we can pimp up our parent component `app.js` by adding a nested Styled Component at the top.

Three steps:

- Import Styled Components library: `import styled from 'styled-components';`

- Create Styled Components:

    ```
    // Create a <Title> react component that renders an <h1> which is
    // centered, palevioletred and sized at 1.5em
    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
    `;
    
    // Create a <Wrapper> react component that renders a <section> with
    // some padding and a papayawhip background
    const Wrapper = styled.section`
      padding: 4em;
      background: papayawhip;
    `;
    ```

- Show/render the Styled Components above our UserList component:

    ```
    <div>
        <Wrapper>
            <Title>Hello World, this is my first styled component!</Title>
        </Wrapper>
        <UserList />
    </div>
    ```

Not too difficult !

It also works with Media Queries and Pseudo Selectors:

    ```
    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
    
      @media (max-width: 700px) {
        background: yellow;
      }
      
      // Ampersands (&) get replaced by our generated, unique classname for that styled component
      &:hover {
        background: blue;
      }
    `;
    ```
Please also check out new libraries Emotion and Glamorous. They are enhanced Styled Components:

- https://github.com/emotion-js/emotion
- https://glamorous.rocks/getting-started/

## <a id="chapter2e"></a>v. Styling at Component Level Scope with CSS

A component file can have its own CSS file where its CSS classes/ids are NOT bleeding out to other components.

These CSS files are called CSS Modules (https://github.com/css-modules/css-modules). Let's dive into them ...

### First install CSS Loader (see https://webpack.js.org/loaders/css-loader/)

```
> npm install --save-dev css-loader
```

The CSS Loader is needed to create hashed styles that are NOT bleeding out of the component (and can affect other components).

Example:

Source class ...

```
.greenBg{
    background-color: green;
}
```

... becomes ...

```
.src-components-user_list__greenBg--2F7ek{
    background-color: green;
}
```

.. and is only consumable in the component's scope, NOT in any other component.


### Second install the plugin `extract-text-webpack-plugin` (see https://github.com/webpack-contrib/extract-text-webpack-plugin)

```
> npm install --save-dev extract-text-webpack-plugin@next
```

This plugin is needed to create a CSS file out of the above loaded (hashed) CSS. We needed to use `@next` version as the latest version caused a Chunk conflict (https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/760). I hope this will be fixed soon to run with latest Webpack.


### Third: Create and import the component scoped CSS file

We created `user_list.css` to be the CSS file for `user_list.js` component.

Then we import it in the component: 

```
import styles from './user_list.css'
```
 
### Testing Development:

```
> npm run dev
```

### Testing Production:

```
> npm run prod
```

See Testing section in chapter 1 above for more details.


Alternatively for Testing Development, if you DON'T want to create a CSS file, but want style tags placed inside the 
header of `index.html` instead, do the following:

- Install Style Loader (see https://webpack.js.org/loaders/style-loader/ and https://github.com/webpack-contrib/style-loader):

    ```
    > npm install --save-dev style-loader
    ```
- Copy content of `webpack.config.dev_with_injected_style_tag_in_index.html` into `webpack.config.dev.js`

- Comment out `<link rel="stylesheet" href="/style/styles-scoped.css">` in `index.html`

- Finally run 

    ```
    > npm run dev
    ```
    
## <a id="chapter2f"></a>vi. Styling with global Sass

If you don't want (or need) to do styling within the React eco-system, and are used to Sass, you might be right here.

*Notes:*

- Of course you can still mix styling strategies. Whatever is necessary to fulfill the requirements of the app you need to develop.
- With Sass you still need to connect your React component to the Sass's CSS output (`className="user-list"`).

### Installation

First we need to install Sass

```
> sudo gem install sass
```
    

### Create Sass Folder Structure and Sass files

Of course your choice. Here we follow SMACSS pattern for CSS (see https://smacss.com/) and decide to have only 4 folders: 

```
0-plugins
1-base
2-layouts
3-modules
_mixins.sass
_variables.sass
app.sass
```

- Plugins: Helper libraries that can give you structure and mixins (functions to use) 
- Base: Base styling, like `body` styling
- Layouts: Section styling, like Header, Footer, or our UserList container
- Modules: Module styling, like our UserList
- _mixins.sass: Here go all our mixins
- _variables.sass: Here go all our global variables
- app.sass: Brings it all together


### Run Sass watcher

To automatically create a new CSS file (and CSS map file) out of the 4 folders above whenever we make a change to a single Sass file,
do the following:

```
> cd style
> sass --watch sass:css
>>> Sass is watching for changes. Press Ctrl-C to stop.
  directory css
      write css/app.css
      write css/app.css.map
>>> Change detected to: sass/_variables.sass
      write css/app.css
      write css/app.css.map
>>> Change detected to: sass/_variables.sass
      write css/app.css
      write css/app.css.map
```

That's it !
 
### Testing Development:

```
> npm run dev
```

### Testing Production:

```
> npm run prod
```

See Testing section in chapter 1 above for more details.


## <a id="chapter3"></a>3. Links

### Have a look !

React & Styling:
- Michele Bertoli's Great Comparison Table: https://github.com/MicheleBertoli/css-in-js
- Maximilian Schwarzmüller, Udemy Course "React 16 - The Complete Guide": https://www.udemy.com/react-the-complete-guide-incl-redux/
- Christopher "vjeux" Chedeau's CSS/React Presentation "CSS in JS": https://speakerdeck.com/vjeux/react-css-in-js

React-Redux App: 
- Stephen Grider, Repo: https://github.com/StephenGrider/AdvancedReduxCode
- Stephen Grider, Udemy Course "Advanced React and Redux": https://www.udemy.com/react-redux-tutorial 

Radium:
- https://github.com/FormidableLabs/radium

Styled Components:
- https://www.styled-components.com/
- https://github.com/styled-components/styled-components

Emotion / Glamorous:
- https://github.com/emotion-js/emotion
- https://glamorous.rocks/getting-started/

CSS Modules:
- https://github.com/css-modules/css-modules
- https://github.com/webpack-contrib/extract-text-webpack-plugin
- Style Loader: 
    - https://webpack.js.org/loaders/style-loader/ 
    - https://github.com/webpack-contrib/style-loader
    - How Head Section of Document gets updated with style tag: https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a

Sass:
- Brad Hussey, Udemy Course "The Sass Course! Learn Sass for Real-World Websites": https://www.udemy.com/learn-sass
- Sass Home: https://sass-lang.com/
- With CRA and without Ejection: https://hackernoon.com/using-sass-with-create-react-app-without-ejecting-b5f4f827ed9e
- Webpack's Sass Loader as alternative to Ruby on Rails: https://medium.com/a-beginners-guide-for-webpack-2/using-sass-9f52e447c5ae

Other:
- Media Queries as React Components: https://github.com/contra/react-responsive
- 4 Ways of Styling React: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822


### Credits to the authors of above links ! Thank you very much !

### And credits to the reader: Thanks for your visit !