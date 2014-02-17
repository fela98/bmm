'use strict';

angular.module('bmmLibApp')
  .factory('bmmApi', [function () {
  
  var factory = {},
      serverUrl = 'localhost';

  /** Set custom serverUrl **/
  factory.serverUrl = function(url) {
    serverUrl = url;
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
      url: serverUrl
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Save a new album **/
  factory.album = function(options) {
    
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
      url: serverUrl+'album',
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get the latest albums of a specific type (Default is all types) **/
  factory.albumLatest = function(options) {
    
    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+
     *    from                      Integer         \d+
     *    content-type              Array(string)   song|speech|audiobook|singsong|video
     *    media-type                Array(string)   audio|video
     *    unpublished               string          hide|show|only
     */

    return $.ajax({
      method: 'GET',
      url: serverUrl+'album/latest',
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of an album **/
  factory.albumGet = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

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
      url: serverUrl+'album/'+id,
      data: $.param(options)
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
      url: serverUrl+'album/'+id,
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Delete an album **/
  factory.albumDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrl+'album/'+id
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of years for the archive **/
  factory.facetsPublishedYears = function(options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only
     */

    return $.ajax({
      method: 'GET',
      url: serverUrl+'facets/published/years',
      data: $.param(options)
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
      url: serverUrl+'login/authentication',
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Authenticates the user by redirecting him to the Sherwood SignOn Server **/
  factory.loginRedirect = function() {

    window.location = serverUrl+'login/redirect?redirect_to='+window.location;

  };

  /** Get a list of the data **/
  factory.search = function(term, options) {

    if (typeof options === 'undefined') { options = {}; }

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
      url: serverUrl+'search/'+term,
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of suggestions based on a given term **/
  factory.suggest = function(term) {

    return $.ajax({
      method: 'GET',
      url: serverUrl+'suggest/'+term
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
      method: 'POST',
      url: serverUrl+'track',
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of the latest tracks in the library **/
  factory.trackLatest = function(options) {

    if (typeof options === 'undefined') { options = {}; }

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
      url: serverUrl+'track/latest',
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a list of tracks related to what you asked for **/
  factory.trackRel = function(name, options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    size                      Integer         \d+ Def = 20
     *    from                      Integer         \d+ Def = 0
     *    content-type              Array(String)   song|speech|audiobook|singsong|video
     *    media-type                Array(String)   audio|video
     *    unpublished               String          hide|show|only Role: ROLE_CONTENT_UNPUBLISHED
     */

    return $.ajax({
      method: 'GET',
      url: serverUrl+'track/rel/'+name,
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of a track **/
  factory.trackGet = function(id) {

    /** RETURNS
     *    Absolute file path
     */

    return $.ajax({
      method: 'GET',
      url: serverUrl+'track/'+id
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of a track **/
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
      url: serverUrl+'track/'+id,
      data: $.param(options)
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of a track **/
  factory.trackDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrl+'track/'+id
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a translated version of a track **/
  factory.trackFiles = function(id, options) {

    if (typeof options === 'undefined') { options = {}; }

    /** OPTIONS (Stars = Required)
     *    type *                    String          audio|video
     *    file *                    file
     */

    return $.ajax({
      method: 'POST',
      url: serverUrl+'track/'+id+'/files'
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Get a file you can play **//* | Doesnt require a function
  factory.trackFetch = function(absPath) {

    /** OPTIONS (Stars = Required)
     *    absPath: *               serverUrl/track/{id}/{lang}/track.{format}
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
      url: serverUrl+'user'
    }).fail( function(xhr) {

      console.log(xhr);

    });

  };

  /** Add a track, and PUT it again **/
  factory.userTrackCollectionLink = function(id, headers) {

    if (typeof headers === 'undefined') { headers = {}; }

    /** headers
     *    'Accept-Language':        String          ISO 639-1 || ISO 639-3
     *    'Link':                   <url1>
     *    'Link':                   <url2>
     */

    return $.ajax({
      method: 'LINK',
      url: serverUrl+'user/track_collection/'+id,
      headers: headers
    }).fail( function(xhr) {

      //console.log(xhr);

    });

  };

  /** Get a collection **/
  factory.userTrackCollectionGet = function(id) {

    return $.ajax({
      method: 'GET',
      url: serverUrl+'user/track_collection/'+id
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

    return $.ajax({
      method: 'PUT',
      url: serverUrl+'user/track_collection/'+id
    }).fail( function(xhr) {

      //console.log(xhr);

    });

  };

  /** Delete a collection **/
  factory.userTrackCollectionDelete = function(id) {

    return $.ajax({
      method: 'DELETE',
      url: serverUrl+'user/track_collection/'+id
    }).fail( function(xhr) {

      //console.log(xhr);

    });

  };

  return factory;

}]);