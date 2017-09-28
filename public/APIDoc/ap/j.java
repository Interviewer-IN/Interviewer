 /**
 * @apiName GetProjects
 * @apiGroup Projects
 *
 * @api {get} api/v1/projects/:id Get all projects
 *
 *
 * @apiDescription Returns all projects which are visible for the currently logged in user.
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *  	"status": "SUCCESS",
 *  	"message": "Project id=30 loaded",
 *  	"data":  {
         	 "id": 30,
           	 "title": "Test",
            	 "description": "test",
            	 "created_at": "2017-08-22T11:32:34.824Z",
            	 "updated_at": "2017-08-22T11:32:34.824Z"
        }
*}
 * @apiSuccess {String} title Title of the Projects.
 * @apiSuccess {String} description  Description of the Projects.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 * @apiError ProjectNotFound The <code>id</code> of the Project was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 *
 */



/**
 * @api {post} api/v1/projects/ Create project
 * @apiName PostProjects
 * @apiGroup Projects
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiParam {String} [title]         Optional title of the Projects.
 * @apiParam {String} [description]     Optional description of the Projects.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     	"title": "Test",

        "description": "test"

 *     }
 *
 * @apiSuccess {String} id The new Projects-ID.
 * @apiSuccess {String} title Title of the Projects.
 * @apiSuccess {String} description  Description of the Projects.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
  	"status": "SUCCESS",
  	"message": "Saved project",
  	"data": {
        	"id": 30,
       		"title": "Test",
       		"description": "test",
       		"created_at": "2017-08-22T11:32:34.824Z",
       		"updated_at": "2017-08-22T11:32:34.824Z"
       }
 *}
 *
 * @apiError ProjectNotFound The <code>id</code> of the Project was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 */



 /**
 * @api {put} api/v1/projects/:id Update project
 * @apiName PutProjects
 * @apiGroup Projects
 * @apiDescription Replace the entire project with the new representation provided.
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiParam {String} [title]         Optional title of the Projects.
 * @apiParam {String} [description]     Optional description of the Projects.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     	"title": "TestUpdate",

        "description": "testUpdate"
 *     }
 *
 * @apiSuccess {String} title Title of the Projects.
 * @apiSuccess {String} description  Description of the Projects.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 	"status": "SUCCESS",
 * 	"message": "Update project",
 *  	"data": {
   		"id": 30,
       	 	"title": "TestUpdate",
        	"description": "testUpdate",
        	"created_at": "2017-08-22T11:32:34.824Z",
        	"updated_at": "2017-08-22T11:44:33.906Z"
    }
*}
 * @apiError ProjectNotFound Returned if the project does not exist.
 * @apiError Unauthorized Returned if the user is not logged in.
 */



 /**
 * @api {patch} api/v1/projects/:id Edit project
 * @apiName PatchProjects
 * @apiGroup Projects
 * @apiDescription Replace parts of existing project.
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 * @apiParam {String} [title]          Optional title of the Projects.
 * @apiParam {String} [description]    Optional description of the Projects.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     	"title": "TestEdit",
        "description": "testUpdate"
 *     }
 *
 *
 * @apiSuccess {String} title 	      Title of the Projects.
 * @apiSuccess {String} description   Description of the Projects.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 	"status": "SUCCESS",
 * 	"message": "Update project",
    	"data": {
         	"id": 30,
         	"title": "TestEdit",
         	"description": "testUpdate",
         	"created_at": "2017-08-22T11:32:34.824Z",
         	"updated_at": "2017-08-22T11:52:25.651Z"
    }
*}
 * @apiError Unauthorized Returned if the user is not logged in.
 * @apiError ProjectNotFound Returned if the project does not exist.
 */



/**
 * @api {delete} api/v1/projects/:id Delete project
 * @apiName DeleteProjects
 * @apiGroup Projects
 *
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccess {String} id              The Projects-ID.
 * @apiSuccess {String} title		    Title of the Projects.
 * @apiSuccess {String} description     Description of the Projects.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * 	"status": "SUCCESS",
 *  	"message": "Project deleted",
    	"data": {
         	"id": 30,
         	"title": "TestEdit",
         	"description": "testUpdate",
         	"created_at": "2017-08-22T11:32:34.824Z",
         	"updated_at": "2017-08-22T11:52:25.651Z"
    }
*}
 * @apiError Unauthorized Returned if the user is not logged in.
 * @apiError ProjectNotFound Returned if the project does not exist.
 */






 /**
  * @api {post} auth/sign_in/ User login
  * @apiName UserLogin
  * @apiGroup User
  *
  * @apiHeader {String} access-key Users unique access-key.
  * @apiHeader {String} content-type application/x-www-form-urlencoded
  * @apiHeader {String} accept application/json
  *
  *
  * @apiParam {String} email        Email of register user.
  * @apiParam {String} password     User`s password.
  *
  * @apiParamExample {json} Request-Example:
  *     {
  *        “email”: “user@user.com”,
  *        “password”: “123456"
  *     }
  *
  * @apiSuccess {String} id ID of the user.
  * @apiSuccess {String} email User`s login.
  * @apiSuccess {String} provider  Description of the Projects.
  * @apiSuccess {String} uid User Identificator.
  * @apiSuccess {String} nickname   Nickname of the user.
  * @apiSuccess {String} image      User`s avatar.
  * @apiSuccess {String} surname    User`s surname.
  * @apiSuccess {String} level_id   ID of the user`s level.
  * @apiSuccess {String} position_id   ID of the position.
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  {
    "data": {
        "id": 3,
        "email": "user@user.com",
        "provider": "email",
        "uid": "user@user.com",
        "name": null,
        "nickname": null,
        "image": null,
        "surname": null,
        "level_id": null,
        "position_id": null
    }
}
  *
  * @apiError NotFound If URL entered incorrect.
  * @apiError Unauthorized Returned <code>Invalid login credentials. Please try again.</code> if email or password invalid.
  */
