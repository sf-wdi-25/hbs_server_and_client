# Client and Server-side Templating

You've already seen us using [client-side templating.](https://github.com/sf-wdi-25/handlebars_templates).

Now we're going to add server-side templating.  Server-side templating allows us to fill-in blanks similar to the way client-side templating does, but BEFORE we send it to the client.  It's really useful for things like _show pages_ because the page can be delivered with the data for a specific record (and id) already on it.


## Setup

hbs is perhaps not the most popular way to use handlebars on the server, but it is one of the simplest.  

* npm install `hbs`

>Hint: make sure you save it


In your server.js add:

```js
// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');
```

This tells express to use hbs as its view engine.  That means it'll use hbs whenever we call `res.render`.


## Server-side rendering


Create an html/handlebars page like:

```html
<html>
<body>
  <h1>{{title}}</h1>
  <p>{{text}}</p>
</body>
</html>
```

Now save this page as views/test.hbs.

Next, we'll configure the server to render this.

```js
app.get('/testpage', function(req,res){
  res.render('test', { title: 'Awesome Post', text: 'Lorem ipsum dolor'})
});
```



We should now be able to view the page at `localhost:3000/testpage`

Next let's try to use an object to fill in the page.  

```js
var userData = { username: 'sparky', age: 43, firstName: 'Clark', lastName: 'Griswold'};

app.get('/profiledata', function(req,res) {
  res.render('userprofile', {user: userData});
});
```

```html
<html>
<body>
  <ul>
    <li>Username: {{user.username}}</li>
    <li>Fullname: {{user.firstName}} {{user.lastName}}</li>
    <li>Age: {{user.age}}</li>
  </ul>
</body>
</html>
```

Great that should work!

> You can see this solution in the code as well.


# Using hbs with both client and server-side templating together

**caution: advanced** You probably don't need both!

For this example take a look at the code in this repo.  Pay attention to the following:

```html
<!--index.hbs-->
<div class="page-header">
  <h1>Microblog </h1>
  <small>{{randomQuote.text}} - {{randomQuote.person}}</small>
</div>
```
For the above code, **server-side** rendering is being used.  The server **must** provide a randomQuote when calling `render`.

```js
//server.js
app.get('/', function (req, res) {
  // note that render here is doing server-side template rendering!
  var quote = getRandomQuote();
  res.render('index', {randomQuote: quote});
});
```

Further down the page you'll see:

```html
<script id="posts-template" type="text/x-handlebars-template">
....
  \{{#each posts}}
    <li class="list-group-item post" data-id="\{{_id}}">

      <!-- post label (title) -->
      <span class="label label-default">\{{title}}</span>
```

This is the **client-side** template!  Note how it's inside a **script** tag; it won't be displayed on the page.  The client-side JS can grab it from here and display it on the page after compiling.

**Why isn't the server filling in the hbs blanks?**

Note how each `{{}}` is **pre-fixed by a backslash**.  This is really important.  It keeps the server from trying to fill in the {{}} so the client-side can still see them.  Without these, the server would try to replace `{{title}}` with a title (which we don't have)!
