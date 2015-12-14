/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var posts = [];
posts.push({
  title: 'The same thing we do everynight',
  body: 'try to take over the world'
};
posts.push({
  title: 'Using express


/* end of hard-coded data */




$(document).ready(function() {
  sampleAlbums.forEach(function(album) {
    renderAlbum(album);
  });
  console.log('app.js loaded!');
});





// this function takes a single album and renders it to the page
function renderAlbum(taco) {
  console.log('rendering album:', taco);
  var template = $('#albumTemplate').html();
  console.log('template', template);

  // compiledTemplate is actually a function!
  var compiledTemplate = Handlebars.compile(template);
  var htmlFromCompiledTemplate = compiledTemplate( { album: taco } );

  $('#albums').prepend( htmlFromCompiledTemplate );

}
