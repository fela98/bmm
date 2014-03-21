'use strict';

angular.module('bmmLibApp')
  .factory('bmmApi', [function () {
  
  var factory = {},
      serverUrli = 'localhost/';

  /**
   *  Set custom serverUrli
   *  
   *  @method serverUrli
   *  @requires url
   *  @final
   */
  factory.serverUrl = function(url) {
    serverUrli = url;
  };

  factory.getserverUrli = function() {
    return serverUrli;
  };

  /** Get the basic information about the API **/
  factory.root = function() {
    
    /** RETURNS
     *    name                      String
     *    documentation             Url
     *    system_status             Object
     *      database                Boolean
     *      search                  Boolean
     *    languages                 Array(String)
     */

    return $.ajax({
      method: 'GET',
      crossDomain: true,
      url: serverUrli,
      dataType: 'json'
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Save a new album **/
  factory.albumPost = function(options) {
    
    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    parent_id *               Integer         Can also be NULL
     *    started_at *              datetime        ISO 8601
     *    ended_at *                datetime        ISO 8601
     *    original_language *       String          ISO 639-1 || ISO 639-3
     *    translations [{           Array(objects)
     *      language: '',           string          ISO 639-1 || ISO 639-3
     *      title: ''               String
     *    }]
     *    cover *                   String
     *    show_in_listing *         Boolean
     *    show_in_library *         Boolean
     *    type                      String          Always 'album'
     *    description               String
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'album/',
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get the latest albums of a specific type (Default is all types) **/
  factory.albumLatest = function(options, language) {
    
    if (typeof options === 'undefined') { options = {}; }
    if (typeof language === 'undefined') { language = ''; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+
     *    from                      Integer         \d+
     *    content-type              Array(string)   song|speech|audiobook|singsong|video
     *    media-type                Array(string)   audio|video
     *    unpublished               string          hide|show|only
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'album',
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of an album **/
  factory.albumGet = function(id, language, options) {

    if (typeof options === 'undefined') { options = {}; }
    if (typeof language === 'undefined') { language = ''; }

    /** OPTIONS (Stars = Required)
     *    raw                       Boolean         Role: ROLE_ALBUM_MANAGER
     */

    /** RETURNS
     *    id                        Integer
     *    parent_id                 Integer
     *    type                      String
     *    description               String
     *    created_at                datetime        ISO 8601
     *    ended_at                  datetime        ISO 8601
     *    started_at                datetime        ISO 8601
     *    original_languages        String          ISO 639-1 || ISO 639-3
     *    translations [{           Array(objects)
     *      language: '',           string          ISO 639-1 || ISO 639-3
     *      title: ''               String
     *    }]
     *    show_in_listing *         Boolean
     *    show_in_library *         Boolean
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'album/'+id,
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Save an album **/
  factory.albumPut = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    parent_id *               Integer         Can also be NULL
     *    started_at *              datetime        ISO 8601
     *    ended_at *                datetime        ISO 8601
     *    original_language *       String          ISO 639-1 || ISO 639-3
     *    translations [{           Array(objects)
     *      language: '',           string          ISO 639-1 || ISO 639-3
     *      title: ''               String
     *    }]
     *    cover *                   String
     *    show_in_listing *         Boolean
     *    show_in_library *         Boolean
     *    type                      String          Always 'album'
     *    description               String
     */

    return $.ajax({
      method: 'PUT',
      url: serverUrli+'album/'+id,
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Delete an album **/
  factory.albumDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrli+'album/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of years with albums for the archive (published sorting) **/
  factory.facetsAlbumPublishedYears = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'facets/album_published/years',
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of years with tracks for the archive (recorded sorting) **/
  factory.facetsTrackRecordedYears = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'facets/track_recorded/years',
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Authenticate by username and password **/
  factory.loginAuthentication = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    username *                String
     *    password *                String
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'login/authentication',
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Authenticates the user by redirecting him to the Sherwood SignOn Server **/
  factory.loginRedirect = function() {

    window.location = serverUrli+'login/redirect?redirect_to='+window.location;

  };

  /** Get a list of the data **/
  factory.search = function(term, options, language) {

    if (typeof options === 'undefined') { options = {}; }
    if (typeof language === 'undefined') { language = ''; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+ Def = 20
     *    from                      Integer         \d+ Def = 0
     *    resource-type             Array(String)   album|track
     *    media-type                Array(String)   audio|video
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    unpublished               String          hide|show|only Role: ROLE_CONTENT_UNPUBLISHED
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'search/'+term,
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of suggestions based on a given term **/
  factory.suggest = function(term, language) {

    if (typeof language === 'undefined') { language = ''; }

    return $.ajax({
      method: 'GET',
      url: serverUrli+'suggest/'+term,
      headers: {
        'Accept-Language': language
      },
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Save a new track **/
  factory.track = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    parent_id *               Integer
     *    listing_parent *          Integer
     *    order *                   Integer
     *    type                      String
     *    description               String
     *    subtype *                 String          speech|audiobook|singsong|video
     *    tags *                    Array(String)
     *    published_at *            datetime        ISO 8601
     *    original_language *       String          ISO 639-1 || ISO 639-3 zxx
     *    translations [{ *         Array(objects)
     *      language: '', *         String          ISO 639-1 || ISO 639-3 zxx
     *      title: '', *            String
     *      rel [{ *                Array(objects)
     *        type: '', *           String          bible|composer|lyrics|interpret|songbook
     *        id: int, *            Integer         type: songbook
     *        name: '',             String          type: composer|lyrics|interpret|songbook
     *        timestamp: int, *     Integer         type: bible|songbook
     *        book: '',             String          type: bible
     *        chapter: int, *       Integer         type: bible
     *        verse: int *          Integer         type: bible
     *      }],
     *      media [{ *              Array(Objects)
     *        type: '',             String          audio|video
     *        files: [{ *
     *          mime_type: '', *    String
     *          length: int, *      Integer
     *          size: int, *        Integer
     *          path: '' *          String
     *        }],
     *      }],
     *    }]
     *    rel[{
     *      type: '', *             String
     *      id: int, *              Integer         type: songbook
     *      name: '',               String          type: composer|lyrics|interpret|songbook
     *      timestamp: int, *       Integer         type: bible|songbook
     *      book: '',               String          type: bible
     *      chapter: int, *         Integer         type: bible
     *      verse: int *            Integer         type: bible
     *    }]
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'track',
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of the latest tracks in the library **/
  factory.trackLatest = function(options, language) {

    if (typeof options === 'undefined') { options = {}; }
    if (typeof language === 'undefined') { language = ''; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+ Def = 20
     *    from                      Integer         \d+ Def = 0
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only Role: ROLE_CONTENT_UNPUBLISHED
     *    tags                      Array(String)
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'track',
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of tracks related to what you asked for **/
  factory.trackRel = function(key, options, language) {

    if (typeof options === 'undefined') { options = {}; }
    if (typeof language === 'undefined') { language = ''; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+ Def = 20
     *    from                      Integer         \d+ Def = 0
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only Role: ROLE_CONTENT_UNPUBLISHED
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'track/rel/'+key,
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of a track **/
  factory.trackGet = function(id, language, options) {

    if (typeof language === 'undefined') { language = ''; }
    if (typeof options === 'undefined') { options = {}; }

    /** RETURNS
     *    Absolute file path
     */

    return $.ajax({
      method: 'GET',
      url: serverUrli+'track/'+id,
      headers: {
        'Accept-Language': language
      },
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Save a new track to existing album **/
  factory.trackPut = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    parent_id *               Integer
     *    listing_parent *          Integer
     *    order *                   Integer
     *    type                      String
     *    description               String
     *    subtype *                 String          speech|audiobook|singsong|video
     *    tags *                    Array(String)
     *    published_at *            datetime        ISO 8601
     *    original_language *       String          ISO 639-1 || ISO 639-3 zxx
     *    translations [{ *         Array(objects)
     *      language: '', *         String          ISO 639-1 || ISO 639-3 zxx
     *      title: '', *            String
     *      rel [{ *                Array(objects)
     *        type: '', *           String          bible|composer|lyrics|interpret|songbook
     *        id: int, *            Integer         type: songbook
     *        name: '',             String          type: composer|lyrics|interpret|songbook
     *        timestamp: int, *     Integer         type: bible|songbook
     *        book: '',             String          type: bible
     *        chapter: int, *       Integer         type: bible
     *        verse: int, *         Integer         type: bible
     *      }],
     *      media [{ *              Array(Objects)
     *        type: '',             String          audio|video
     *        files: [{ *
     *          mime_type: '', *    String
     *          length: int, *      Integer
     *          size: int, *        Integer
     *          path: '' *          String
     *        }],
     *      }],
     *    }]
     *    rel[{
     *      type: '', *             String
     *      id: int, *              Integer         type: songbook
     *      name: '',               String          type: composer|lyrics|interpret|songbook
     *      timestamp: int, *       Integer         type: bible|songbook
     *      book: '',               String          type: bible
     *      chapter: int, *         Integer         type: bible
     *      verse: int, *           Integer         type: bible
     *    }]
     */

    return $.ajax({
      method: 'PUT',
      url: serverUrli+'track/'+id,
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Delete a track **/
  factory.trackDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrli+'track/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Add a file to a track **/
  factory.trackFiles = function(id, type, file) {

    //if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    type *                    String          audio|video
     *    file *                    file
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'track/'+id+'/files',
      file: file,
      dataType: 'json',
      data: JSON.stringify({
        type: type
      }),
      contentType: 'application/json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

    //$.each($files, function() {
/*
        //var file = this;
        return $scope.upload = $upload.upload({
          url: serverUrli+'track/'+id+'/files', //upload.php script, node.js route, or servlet url
          method: 'POST',
          // headers: {'headerKey': 'headerValue'},
          // withCredentials: true,
          file: file,
          data: $.param({
            type: type,
            file: file
          })
          //dataType: 'json'
          // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
          /* set file formData name for 'Content-Desposition' header. Default: 'file' */
          //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
          /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
          //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
        /*}).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data/*, status, headers, config*//*) {
          // file is uploaded successfully
          /*console.log(data);
        });
        //.error(...)
        //.then(success, error, progress); 
      //});
      // $scope.upload = $upload.upload({...})
      //alternative way of uploading, sends the the file content directly with the same content-type of the file. Could be used to upload files to CouchDB, imgur, etc... for HTML5 FileReader browsers. 
*/
  };

  /** Get a file you can play **//* | Doesnt require a function
  factory.trackFetch = function(absPath) {

    /** OPTIONS (Stars = Required)
     *    absPath: *               serverUrli/track/{id}/{lang}/track.{format}
     *    {id}: *                  Integer
     *    {lang}: *                String          ISO 639-1 || ISO 639-3
     *    {format}: *              String          mp3|opus|mp4
     *//*

    return $.ajax({
      method: 'GET',
      url: absPath
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };*/

  /** Get the users profile **/
  factory.user = function() {

    return $.ajax({
      method: 'GET',
      url: serverUrli+'user',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Add a track, and PUT it again **/
  factory.userTrackCollectionPost = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** headers
     *    'Accept-Language':        String          ISO 639-1 || ISO 639-3
     *    'Link':                   <url1> <- Currently not working with multiple
     *    'Link':                   <url2> <- last will be used
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'track_collection/',
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function() {

      //console.log(xhr);

    });

  };

  /** Add a track, and PUT it again **/
  factory.userTrackCollectionLink = function(playlist, tracks, language) {

    if (typeof tracks === 'undefined') { tracks = {}; }

    /** headers
     *    'Accept-Language':        String          ISO 639-1 || ISO 639-3
     *    'Link':                   <url1> <- Currently not working with multiple
     *    'Link':                   <url2> <- last will be used
     */

    return $.ajax({
      method: 'POST',
      url: serverUrli+'track_collection/'+playlist,
      beforeSend: function (xhr) {
        $.each(tracks, function() {
          //@todo - Find a solution for multiple Link requests
          xhr.setRequestHeader('Link', '<'+serverUrli+'track/'+this+'>');
        });
        xhr.setRequestHeader('Accept-Language', language);
      },
      dataType: 'json',
      data: JSON.stringify({
        _method: 'LINK'
      }),
      contentType: 'application/json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function() {

      //console.log(xhr);

    });

  };

  /** Get a collection **/
  factory.userTrackCollectionGet = function(id) {

    return $.ajax({
      method: 'GET',
      url: serverUrli+'track_collection/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Add to collection **/
  factory.userTrackCollectionPut = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    type                      String          Always 'track_collection'
     *    track_references [{ *
     *      id: int, *              Integer
     *      language: '', *         String          ISO 639-1 || ISO 639-3
     *    }]
     */

    options.type = 'track_collection';

    return $.ajax({
      method: 'PUT',
      url: serverUrli+'track_collection/'+id,
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function() {

      //console.log(xhr);

    });

  };

  /** Delete a collection **/
  factory.userTrackCollectionDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrli+'track_collection/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function() {

      //console.log(xhr);

    });

  };

  /** Get a list of contributors **/
  factory.contributorGet = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    return $.ajax({
      method: 'GET',
      url: serverUrli+'contributor',
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Insert a contributor **/
  factory.contributorPost = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    return $.ajax({
      method: 'POST',
      url: serverUrli+'contributor',
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a contributor **/
  factory.contributorIdGet = function(id) {

    return $.ajax({
      method: 'GET',
      url: serverUrli+'contributor/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Update a contributor **/
  factory.contributorIdPut = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    return $.ajax({
      method: 'PUT',
      url: serverUrli+'contributor/'+id,
      data: JSON.stringify(options),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Delete a contributor **/
  factory.contributorIdDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrli+'contributor/'+id,
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of tracks from contributor **/
  factory.contributorTracksGet = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    return $.ajax({
      method: 'GET',
      url: serverUrli+'contributor/'+id+'/track/',
      data: $.param(options),
      dataType: 'json',
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  return factory;

}]);