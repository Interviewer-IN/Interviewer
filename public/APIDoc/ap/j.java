*==========Projects========
*========Get=======
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

*========Create=======

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

 *=====Update======

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


 *=====Edit======
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

 *=====Delete======

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




* =================UserLogin================
*=====login======

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



* =======================vacancies====================
*====get====
/**
 * @apiName GetVacancies
 * @apiGroup Vacancies
 *
 * @api {get} api/v1/vacancies/:id Get all vacancies
 *
 *
 * @apiDescription Returns all vacancies which are visible for the currently logged in user.
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "status": "SUCCESS",
    "message": "Vacancies loaded",
    "data": [
        {
            "id": 5,
            "description": "[\"Reprehenderit magni tenetur sed distinctio in. Est tempore ex laborum nam. Voluptas recusandae consectetur. Hic cumque voluptas nihil nulla culpa a.\", \"A ut fugit labore possimus doloremque. Ipsa similique aut. Id et error excepturi ut et sunt.\", \"Occaecati cupiditate sunt qui et debitis et. Vero laudantium maxime cumque blanditiis corporis perferendis consequatur. Enim quod et sit temporibus. Placeat ut quae nihil et. Suscipit ea fugit harum sint ut sed praesentium.\"]",
            "status": "Lots of planets have a north!",
            "created_at": "2017-10-03T01:24:41.071Z",
            "updated_at": "2017-10-03T01:24:41.071Z",
            "level_id": 2,
            "position_id": 3,
            "project_id": 2
        }
*}
 * @apiSuccess {String} id  Unique id of the vacancy.
 * @apiSuccess {String} description  Description of the vacancy.
 * @apiSuccess {String} status  Status of the vacancy.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 * @apiSuccess {String} level_id      Level id for vacancy.
 * @apiSuccess {String} position_id   ID of the position for vacancy.
 * @apiSuccess {String} project_id    Id of the project which includes the vacancy.
 *
 * @apiError ProjectNotFound The <code>id</code> of the Project was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 *
 */

*====create====
 /**
  * @api {post} api/v1/vacancies/ Create vacancy
  * @apiName PostVacancy
  * @apiGroup Vacancies
  *
  * @apiHeader {String} access-key Users unique access-key.
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
  *
  * @apiParam {String} level_id       Mandatory level of the vacancy.
  * @apiParam {String} project_id    Mandatory project of the vacancy.
  * @apiParam {String} position_id    Mandatory position of the vacancy.
  *
  * @apiParamExample {json} Request-Example:
  * {
        "level_id": 4,
        "project_id": 87,
        "position_id": 4
    }
  *
  * @apiSuccess {String} id  Unique id of the vacancy.
  * @apiSuccess {String} description  Description of the vacancy.
  * @apiSuccess {String} status  Status of the vacancy.
  * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
  * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
  * @apiSuccess {String} level_id      Level id for vacancy.
  * @apiSuccess {String} position_id   ID of the position for vacancy.
  * @apiSuccess {String} project_id    Id of the project which includes the vacancy.
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  *
  {
      "status": "SUCCESS",
      "message": "Saved vacancy",
      "data": {
          "id": 6,
          "description": null,
          "status": null,
          "created_at": "2017-10-04T11:08:13.287Z",
          "updated_at": "2017-10-04T11:08:13.287Z",
          "level_id": 4,
          "position_id": 4,
          "project_id": 87
      }
  }
  *
  *
  * @apiError VacanciesNotFound The <code>id</code> of the Project was not found.
  * @apiError Unauthorized Returned if the user is not logged in.
  */

*======editVac======
/**
* @api {patch} api/v1/vacancies/:id Edit Vacancies
* @apiName PatchVacancies
* @apiGroup Vacancies
* @apiDescription Replace parts of existing Vacancies.
*
*
* @apiHeader {String} access-key Users unique access-key.
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} [description]        Optional description of the Vacancies.
*
* @apiParamExample {json} Request-Example:
{
     "description": "test"
  }
*
*
* @apiSuccess {String} id 	          ID of the level.
* @apiSuccess {String} name          Name of the level.
* @apiSuccess {String} created_at    Mandatory with data of creating(By default).
* @apiSuccess {String} updated_at    Mandatory with data of update(By default).
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
{
    "status": "SUCCESS",
    "message": "Update vacancy",
    "data": {
        "id": 6,
        "description": "test",
        "level_id": 4,
        "project_id": 87,
        "position_id": 4,
        "status": null,
        "created_at": "2017-10-04T11:08:13.287Z",
        "updated_at": "2017-10-04T11:17:33.480Z"
    }
}
* @apiError Unauthorized Returned if the user is not logged in.
* @apiError VacancieNotFound Returned if the project does not exist.
*/
*=========updateVac=======
/**
* @api {put} api/v1/vacancies/:id Update vacancies
* @apiName PutVacancies
* @apiGroup Vacancies
* @apiDescription Replace the entire project with the new representation provided.
*
* @apiHeader {String} access-key Users unique access-key.
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} [description]        Optional description of the Vacancies.
*
* @apiParamExample {json} Request-Example:
{
       "description": "test1"
    }
*
*
* @apiSuccess {String} id  Unique id of the vacancy.
* @apiSuccess {String} description  Description of the vacancy.
* @apiSuccess {String} status  Status of the vacancy.
* @apiSuccess {String} created_at    Mandatory with data of creating(By default).
* @apiSuccess {String} updated_at    Mandatory with data of update(By default).
* @apiSuccess {String} level_id      Level id for vacancy.
* @apiSuccess {String} position_id   ID of the position for vacancy.
* @apiSuccess {String} project_id    Id of the project which includes the vacancy.
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
{
    "status": "SUCCESS",
    "message": "Update vacancy",
    "data": {
        "id": 6,
        "description": "test1",
        "level_id": 4,
        "project_id": 87,
        "position_id": 4,
        "status": null,
        "created_at": "2017-10-04T11:08:13.287Z",
        "updated_at": "2017-10-04T11:28:59.890Z"
    }
}
* @apiError Unauthorized Returned if the user is not logged in.
* @apiError VacancieNotFound Returned if the project does not exist.
*/
*======deleteVac======
/**
 * @api {delete} api/v1/vacancies/:id Delete vacancies
 * @apiName DeleteVacancies
 * @apiGroup Vacancies
 *
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccess {String} id  Unique id of the vacancy.
 * @apiSuccess {String} description  Description of the vacancy.
 * @apiSuccess {String} status  Status of the vacancy.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 * @apiSuccess {String} level_id      Level id for vacancy.
 * @apiSuccess {String} position_id   ID of the position for vacancy.
 * @apiSuccess {String} project_id    Id of the project which includes the vacancy.

 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
     "status": "SUCCESS",
     "message": "Vacancy deleted",
     "data": {
         "id": 6,
         "description": "test1",
         "status": null,
         "created_at": "2017-10-04T11:08:13.287Z",
         "updated_at": "2017-10-04T11:28:59.890Z",
         "level_id": 4,
         "position_id": 4,
         "project_id": 87
     }
 }
 * @apiError Unauthorized Returned if the user is not logged in.
 * @apiError VacancieNotFound Returned if the project does not exist.
 */

* =======================levels====================
*=====get======

/**
 * @apiName GetLevels
 * @apiGroup Levels
 *
 * @api {get} api/v1/levels/:id Get levels
 *
 *
 * @apiDescription Returns all levels which are visible for the currently logged in user.
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "SUCCESS",
    "message": "Levels loaded",
    "data": [
        {
            "id": 4,
            "name": "Senior",
            "created_at": "2017-10-03T01:24:40.364Z",
            "updated_at": "2017-10-03T01:24:40.364Z"
        }

 * @apiSuccess {String} id  Unique id of the level.
 * @apiSuccess {String} name  Name of the level.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).

 *
 * @apiError ProjectNotFound The <code>id</code> of the Project was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 *
 */
 *========CreateLevel======
 //todo
  /**
   * @api {post} api/v1/levels/ Create level
   * @apiName PostLevels
   * @apiGroup Levels
   *
   * @apiHeader {String} access-key Users unique access-key.
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   *
   * @apiParam {String} name   Mandatory name of the level.
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *     	"name": "Test"
   *     }
   *
   * @apiSuccess {String} id            The new level-ID.
   * @apiSuccess {String} name          Name of the level.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   {
     "status": "SUCCESS",
     "message": "Saved level",
     "data": {
         "id": 6,
         "name": "Test",
         "created_at": "2017-10-04T08:23:27.316Z",
         "updated_at": "2017-10-04T08:23:27.316Z"
     }
 }
   *
   * @apiError LevelNotFound The <code>id</code> of the Project was not found.
   * @apiError Unauthorized Returned if the user is not logged in.
   */
   *=====EditLevel======
   /**
   * @api {patch} api/v1/levels/:id Update level
   * @apiName PatchLevel
   * @apiGroup Levels
   * @apiDescription Replace parts of existing levels.
   *
   *
   * @apiHeader {String} access-key Users unique access-key.
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   * @apiParam {String} [name]        Optional name of the level.
   *
   * @apiParamExample {json} Request-Example:
     {
     	   "name": "Test1"
      }
   *
   *
   * @apiSuccess {String} id 	          ID of the level.
   * @apiSuccess {String} name          Name of the level.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   {
     "status": "SUCCESS",
     "message": "Update level",
     "data": {
         "id": 6,
         "name": "Test1",
         "created_at": "2017-10-04T08:23:27.316Z",
         "updated_at": "2017-10-04T08:25:17.216Z"
     }
 }
   * @apiError Unauthorized Returned if the user is not logged in.
   * @apiError LeveltNotFound Returned if the project does not exist.
   */

*======PachLevel======
/**
* @api {patch} api/v1/levels/:id Edit Level
* @apiName PatchLevels
* @apiGroup Levels
* @apiDescription Replace parts of existing Levels.
*
*
* @apiHeader {String} access-key Users unique access-key.
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} [name]        Optional name of the level.
*
* @apiParamExample {json} Request-Example:
  {
      "name": "Test1"
   }
*
*
* @apiSuccess {String} id 	          ID of the level.
* @apiSuccess {String} name          Name of the level.
* @apiSuccess {String} created_at    Mandatory with data of creating(By default).
* @apiSuccess {String} updated_at    Mandatory with data of update(By default).
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
{
  "status": "SUCCESS",
  "message": "Update level",
  "data": {
      "id": 6,
      "name": "Test1",
      "created_at": "2017-10-04T08:23:27.316Z",
      "updated_at": "2017-10-04T08:25:17.216Z"
  }
}
* @apiError Unauthorized Returned if the user is not logged in.
* @apiError LeveltNotFound Returned if the project does not exist.
*/

*======DeleteLevel=======
/**
 * @api {delete} api/v1/levels/:id Delete Level
 * @apiName DeleteLevels
 * @apiGroup Levels
 *
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccess {String} id            The Level-ID.
 * @apiSuccess {String} name		      Name of the Level.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
     "status": "SUCCESS",
     "message": "Level deleted",
     "data": {
         "id": 6,
         "name": "Test1",
         "created_at": "2017-10-04T08:23:27.316Z",
         "updated_at": "2017-10-04T08:25:17.216Z"
     }
 }
 * @apiError Unauthorized Returned if the user is not logged in.
 * @apiError LevelNotFound Returned if the project does not exist.
 */


 * =======================Positions====================
 *=====get======

 /**
  * @apiName GetPositions
  * @apiGroup Positions
  *
  * @api {get} api/v1/positions/:id Get Positions
  *
  *
  * @apiDescription Returns all Positions which are visible for the currently logged in user.
  *
  * @apiHeader {String} access-key Users unique access-key.
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  *  "status": "SUCCESS",
    "message": "Positions loaded",
    "data": [
        {
            "id": 4,
            "name": "Back-end",
            "created_at": "2017-10-03T01:24:40.499Z",
            "updated_at": "2017-10-03T01:24:40.499Z"
        }

  * @apiSuccess {String} id  Unique id of the Positions.
  * @apiSuccess {String} name  Name of the Positions.
  * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
  * @apiSuccess {String} updated_at    Mandatory with data of update(By default).

  *
  * @apiError ProjectNotFound The <code>id</code> of the Project was not found.
  * @apiError Unauthorized Returned if the user is not logged in.
  *
  */

  *========CreatePositions======
   /**
    * @api {post} api/v1/positions/ Create Positions
    * @apiName PostPositions
    * @apiGroup Positions
    *
    * @apiHeader {String} access-key Users unique access-key.
    * @apiHeader {String} content-type application/json; charset=utf-8
    * @apiHeader {String} accept application/json
    *
    *
    * @apiParam {String} [name]   Mandatory name of the position.
    *
    * @apiParamExample {json} Request-Example:
    *     {
    *     	"name": "Test"
    *     }
    *
    * @apiSuccess {String} id            The new position-ID.
    * @apiSuccess {String} name          Name of the position.
    * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
    * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    {
      "status": "SUCCESS",
      "message": "Saved position",
      "data": {
          "id": 6,
          "name": "Test",
          "created_at": "2017-10-04T08:45:58.122Z",
          "updated_at": "2017-10-04T08:45:58.122Z"
      }
  }
  *
    * @apiError PositionNotFound The <code>id</code> of the Project was not found.
    * @apiError Unauthorized Returned if the user is not logged in.
    */
    *=====EditPositions======
    /**
    * @api {put} api/v1/positions/:id Update level
    * @apiName PutPositions
    * @apiGroup Positions
    * @apiDescription Replace parts of existing positions.
    *
    *
    * @apiHeader {String} access-key Users unique access-key.
    * @apiHeader {String} content-type application/json; charset=utf-8
    * @apiHeader {String} accept application/json
    *
    * @apiParam {String} [name]        Optional name of the positions.
    *
    * @apiParamExample {json} Request-Example:
    {
         	"name": "Test6"
         }
    *
    *
    * @apiSuccess {String} id 	          ID of the positions.
    * @apiSuccess {String} name          Name of the positions.
    * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
    * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
    *
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *
    {
    "status": "SUCCESS",
    "message": "Update position",
    "data": {
        "id": 6,
        "name": "Test6",
        "created_at": "2017-10-04T08:45:58.122Z",
        "updated_at": "2017-10-04T08:47:41.916Z"
    }
}
    * @apiError Unauthorized Returned if the user is not logged in.
    * @apiError PositionstNotFound Returned if the project does not exist.
    */

 *======PachPositions======
 /**
 * @api {pach} api/v1/positions/:id Edit Level
 * @apiName PatchPositions
 * @apiGroup Positions
 * @apiDescription Replace parts of existing Positions.
 *
 *
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 * @apiParam {String} [name]        Optional name of the positions.
 *
 * @apiParamExample {json} Request-Example:
 {
        "name": "Test7"
      }
 *
 *
 * @apiSuccess {String} id 	          ID of the positions.
 * @apiSuccess {String} name          Name of the positions.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
     "status": "SUCCESS",
     "message": "Update position",
     "data": {
         "id": 6,
         "name": "Test7",
         "created_at": "2017-10-04T08:45:58.122Z",
         "updated_at": "2017-10-04T08:49:47.054Z"
     }
 }
 * @apiError Unauthorized Returned if the user is not logged in.
 * @apiError PositionstNotFound Returned if the project does not exist.
 */


 *======DeletePosition=======
 /**
  * @api {delete} api/v1/positions/:id Delete Position
  * @apiName DeletePosition
  * @apiGroup Positions
  *
  *
  *
  * @apiHeader {String} access-key Users unique access-key.
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
  *
  * @apiSuccess {String} id            The Level-ID.
  * @apiSuccess {String} name		      Name of the Level.
  * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
  * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
  *
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  {
      "status": "SUCCESS",
      "message": "Position deleted",
      "data": {
          "id": 6,
          "name": "Test7",
          "created_at": "2017-10-04T08:45:58.122Z",
          "updated_at": "2017-10-04T08:49:47.054Z"
      }
  }
  * @apiError Unauthorized Returned if the user is not logged in.
  * @apiError PositionNotFound Returned if the project does not exist.
  */
