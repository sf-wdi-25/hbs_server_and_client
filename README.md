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


## render with template (server-side)


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
userData = { username: 'sparky', age: 43, firstName: 'Clark', lastName: 'Griswold'}

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



# Using hbs with both client and server-side templating together

**caution: advanced**
