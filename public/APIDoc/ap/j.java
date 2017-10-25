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
}
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
  * @apiHeader {String} content-type aapplication/json
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
  * @apiSuccess {int} id ID of the user.
  * @apiSuccess {String} email User`s login.
  * @apiSuccess {String} provider  Description of the Projects.
  * @apiSuccess {String} uid User Identificator.
  * @apiSuccess {String} nickname   Nickname of the user.
  * @apiSuccess {String} image      User`s avatar.
  * @apiSuccess {String} surname    User`s surname.
  * @apiSuccess {int} level_id   ID of the user`s level.
  * @apiSuccess {int} position_id   ID of the position.
  * @apiSuccess {Boolen} is_hr      HR user or not.
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  {
    "data": {
        "id": 19,
        "email": "user@user.com",
        "level_id": 3,
        "position_id": 3,
        "provider": "email",
        "uid": "user@user.com",
        "name": null,
        "nickname": null,
        "image": null,
        "surname": null,
        "is_hr": false
    }
}
  *
  * @apiError NotFound If URL entered incorrect.
  * @apiError Unauthorized Returned <code>Invalid login credentials. Please try again.</code> if email or password invalid.
  */

  =========logout==========
/**
 * @api {delete} auth/sign_out/ User logout
 * @apiName UserLogoutn
 * @apiGroup User
 *
 * @apiHeader {String} content-type application/x-www-form-urlencoded
 * @apiHeader {String} accept application/json
 * @apiHeader {String} client       client which comes in login headers.
 * @apiHeader {String} uid          uid which comes in login headers.
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
     "success": true
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
 * @api {get} api/v1/vacancies/:id Get vacancies
 *
 *
 * @apiDescription Returns all vacancies which are visible for the currently logged in user.
 *
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
 * @apiSuccess {int} id  Unique id of the vacancy.
 * @apiSuccess {String} description  Description of the vacancy.
 * @apiSuccess {String} status  Status of the vacancy.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 * @apiSuccess {int} level_id      Level id for vacancy.
 * @apiSuccess {int} position_id   ID of the position for vacancy.
 * @apiSuccess {int} project_id    Id of the project which includes the vacancy.
 *
 * @apiError ProjectNotFound The <code>id</code> of the Vacancies was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 *
 */

*====create====
 /**
  * @api {post} api/v1/vacancies/ Create vacancy
  * @apiName PostVacancy
  * @apiGroup Vacancies
  *
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
  *
  * @apiParam {int} level_id       Mandatory level of the vacancy.
  * @apiParam {int} project_id    Mandatory project of the vacancy.
  * @apiParam {int} position_id    Mandatory position of the vacancy.
  * @apiParam {String} description        Description of the Vacancie.
  *
  * @apiParamExample {json} Request-Example:
  * {
	    "description": "Test description of vacancie",
        "level_id": 4,
        "project_id": 87,
        "position_id": 4
    }
  *
 * @apiSuccess {int} id  Unique id of the vacancy.
 * @apiSuccess {String} description  Description of the vacancy.
 * @apiSuccess {String} status  Status of the vacancy.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
 * @apiSuccess {int} level_id      Level id for vacancy.
 * @apiSuccess {int} position_id   ID of the position for vacancy.
 * @apiSuccess {int} project_id    Id of the project which includes the vacancy.
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
  * @apiError VacanciesNotFound The <code>id</code> of the Vacancies was not found.
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
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} description        Description of the Vacancie.
* @apiParam {int} level_id              ID of the level for Vacancie.
* @apiParam {int} position_id           ID of the position for Vacancie.
* @apiParam {int} project_id            ID of the project for Vacancie.
* @apiParam {Boolen} status             Status of the Vacancies.
*
* @apiParamExample {json} Request-Example:
{
            "description": "test",
            "level_id": 3,
            "position_id": 4,
            "project_id": 1,
            "status": false
        }
*
*
* @apiSuccess {int} id 	          ID of the Vacancies.
* @apiSuccess{Boolen} status             Status of the Vacancies.
* @apiSuccess {String} description        Description of the Vacancie.
* @apiSuccess {int} level_id              ID of the level for Vacancie.
* @apiSuccess {int} position_id           ID of the position for Vacancie.
* @apiSuccess {int} project_id            ID of the project for Vacancie.
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
        "status": true,
        "created_at": "2017-10-04T11:08:13.287Z",
        "updated_at": "2017-10-04T11:17:33.480Z"
    }
}
* @apiError Unauthorized Returned if the user is not logged in.
* @apiError VacancieNotFound Returned if the Vacancies does not exist.
*/
*=========updateVac=======
/**
* @api {put} api/v1/vacancies/:id Update vacancies
* @apiName PutVacancies
* @apiGroup Vacancies
* @apiDescription Replace the entire project with the new representation provided.
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} description        Description of the Vacancie.
* @apiParam {int} level_id              ID of the level for Vacancie.
* @apiParam {int} position_id           ID of the position for Vacancie.
* @apiParam {int} project_id            ID of the project for Vacancie.
* @apiParam {Boolen} status             Status of the Vacancies.
*
* @apiParamExample {json} Request-Example:
{
            "description": "test",
            "level_id": 3,
            "position_id": 4,
            "project_id": 1,
            "status": true
        }
*
*
* @apiSuccess {int} id 	          ID of the Vacancies.
* @apiSuccess{Boolen} status             Status of the Vacancies.
* @apiSuccess {String} description        Description of the Vacancie.
* @apiSuccess {int} level_id              ID of the level for Vacancie.
* @apiSuccess {int} position_id           ID of the position for Vacancie.
* @apiSuccess {int} project_id            ID of the project for Vacancie.
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
        "status": true,
        "created_at": "2017-10-04T11:08:13.287Z",
        "updated_at": "2017-10-04T11:17:33.480Z"
    }
}
* @apiError Unauthorized Returned if the user is not logged in.
* @apiError VacancieNotFound Returned if the Vacancies does not exist.
*/
*======deleteVac======
/**
 * @api {delete} api/v1/vacancies/:id Delete vacancies
 * @apiName DeleteVacancies
 * @apiGroup Vacancies
 *
 *
 *
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *

* @apiSuccess {int} id 	          ID of the Vacancies.
* @apiSuccess{Boolen} status             Status of the Vacancies.
* @apiSuccess {String} description        Description of the Vacancie.
* @apiSuccess {int} level_id              ID of the level for Vacancie.
* @apiSuccess {int} position_id           ID of the position for Vacancie.
* @apiSuccess {int} project_id            ID of the project for Vacancie.
* @apiSuccess {String} created_at    Mandatory with data of creating(By default).
* @apiSuccess {String} updated_at    Mandatory with data of update(By default).

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
 * @apiError VacancieNotFound Returned if the Vacancies does not exist.
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

 * @apiSuccess {int} id  Unique id of the level.
 * @apiSuccess {String} name  Name of the level.
 * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
 * @apiSuccess {String} updated_at    Mandatory with data of update(By default).

 *
 * @apiError levelNotFound The <code>id</code> of the level was not found.
 * @apiError Unauthorized Returned if the user is not logged in.
 *
 */
 *========CreateLevel======
  /**
   * @api {post} api/v1/levels/ Create level
   * @apiName PostLevels
   * @apiGroup Levels
   *
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
   * @apiSuccess {int} id            The new level-ID.
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
   * @apiError LevelNotFound The <code>id</code> of the level was not found.
   * @apiError Unauthorized Returned if the user is not logged in.
   */
   *=====EditLevel======
   /**
   * @api {put} api/v1/levels/:id Update level
   * @apiName PatchLevel
   * @apiGroup Levels
   * @apiDescription Replace parts of existing levels.
   *
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   * @apiParam {String} name        Name of the level.
   *
   * @apiParamExample {json} Request-Example:
     {
     	   "name": "Test1"
      }
   *
   *
   * @apiSuccess {int} id 	          ID of the level.
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
   * @apiError LeveltNotFound Returned if the level does not exist.
   */

*======PachLevel======
/**
* @api {patch} api/v1/levels/:id Edit Level
* @apiName PatchLevels
* @apiGroup Levels
* @apiDescription Replace parts of existing Levels.
*
*
* @apiHeader {String} content-type application/json; charset=utf-8
* @apiHeader {String} accept application/json
*
* @apiParam {String} name       Name of the level.
*
* @apiParamExample {json} Request-Example:
  {
      "name": "Test1"
   }
*
*
* @apiSuccess {int} id 	          ID of the level.
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
* @apiError LeveltNotFound Returned if the level does not exist.
*/

*======DeleteLevel=======
/**
 * @api {delete} api/v1/levels/:id Delete Level
 * @apiName DeleteLevels
 * @apiGroup Levels
 *
 *
 *
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 *
 * @apiSuccess {int} id            The Level-ID.
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
 * @apiError LevelNotFound Returned if the level does not exist.
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
  * @apiDescription Returns all Positions which are visible for the currently logged in user, with ID in URL- returns one position which match ID. 
  *
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

  * @apiSuccess {int} id  Unique id of the Positions.
  * @apiSuccess {String} name  Name of the Positions.
  * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
  * @apiSuccess {String} updated_at    Mandatory with data of update(By default).

  *
  * @apiError PositionsNotFound The <code>id</code> of the Project was not found.
  * @apiError Unauthorized Returned if the user is not logged in.
  *
  */

  *========CreatePositions======
   /**
    * @api {post} api/v1/positions/ Create Positions
    * @apiName PostPositions
    * @apiGroup Positions
    *
    * @apiHeader {String} content-type application/json; charset=utf-8
    * @apiHeader {String} accept application/json
    *
    *
    * @apiParam {String} name   Name of the position.
    *
    * @apiParamExample {json} Request-Example:
    *     {
    *     	"name": "Test"
    *     }
    *
    * @apiSuccess {int} id            The new position-ID.
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
    * @api {put} api/v1/positions/:id Update positions
    * @apiName PutPositions
    * @apiGroup Positions
    * @apiDescription Replace parts of existing positions.
    *
    *
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
    * @apiSuccess {int} id 	          ID of the positions.
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
    * @apiError PositionstNotFound Returned if the positions does not exist.
    */

 *======PatchPositions======
 /**
 * @api {patch} api/v1/positions/:id Edit positions
 * @apiName PatchPositions
 * @apiGroup Positions
 * @apiDescription Replace parts of existing Positions.
 *
 *
 * @apiHeader {String} content-type application/json; charset=utf-8
 * @apiHeader {String} accept application/json
 *
 * @apiParam {String} name       Name of the positions.
 *
 * @apiParamExample {json} Request-Example:
 {
        "name": "Test7"
      }
 *
 *
 * @apiSuccess {int} id 	          ID of the positions.
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
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
  *
  * @apiSuccess {int} id            The positions-ID.
  * @apiSuccess {String} name		      Name of the positions.
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
  * @apiError PositionNotFound Returned if the positions does not exist.
  */


  * =======================Candidates====================
  *=====get======

  /**
   * @apiName GetCandidates
   * @apiGroup Candidates
   *
   * @api {get} api/v1/candidates/:id Get Candidates
   *
   *
   * @apiDescription Returns all Candidates which are visible for the currently logged in user.
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *  {
    "status": "SUCCESS",
    "message": "Candidates loaded",
    "data": [
        {
            "id": 67,
            "age": 30,
            "experience": "Some kind of freelance...",
            "contacts": "skype: abcde; email: abcde@a.com; phone: 6509048934",
            "created_at": "2017-10-25T19:00:06.208Z",
            "updated_at": "2017-10-25T19:03:16.849Z",
            "level_id": 1,
            "position_id": 2,
            "cv": {
                "url": null
            },
            "name": "Justin",
            "surname": "Bieber",
            "notes": "just some notes. nothing interesting..."
        }
   }
   * @apiSuccess {int} id  Unique id of the Candidate.
   * @apiSuccess {String} age  Age of the candidate.
   * @apiSuccess {String} experience  Candidate`s experience.
   * @apiSuccess {String} contacts  Candidate`s contacts.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} level_id      Level of candidate.
   * @apiSuccess {int} position_id    Position of candidate.
   * @apiSuccess {base64} cv    CV of candidate.
   * @apiSuccess {String} name    Name of candidate.
   * @apiSuccess {String} surname    Surname of candidate.
   * @apiSuccess {String} notes    Some notes for candidate.
   *
   * @apiError CandidateNotFound The <code>id</code> of the Candidate was not found.
   * @apiError Unauthorized Returned if the user is not logged in.
   *
   */

   *========CreateCandidates======
    /**
     * @api {post} api/v1/candidates/ Create Candidates
     * @apiName PostCandidates
     * @apiGroup Candidates
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
     *
     * @apiParam {int} level_id     Candidate`s level.
     * @apiParam {int} position_id  Candidate`s position.
     * @apiParam {String} [age]  Candidate`s age.
     * @apiParam {String} [experience]  Candidate`s experience.
     * @apiParam {String} contacts  Candidate`s contacts.
     * @apiParam {base64} [CV]  Candidate`s CV.
     * @apiParam {String} name    Name of candidate.
     * @apiParam {String} surname    Surname of candidate.
     * @apiParam {String} notes    Some notes of candidate.
	 
     * @apiParamExample {json} Request-Example:
     *
     {
      "level_id": 1,
      "position_id": 2,
      "age": "30",
      "experience": "test",
      "contacts": "test",
      "cv": "data:application/pdf;base64, fw3...",
	  "name": "Jim",
	  "surname": "Jimson",
	  "notes": "Some notes about Jim Jimson"
      }
     *
     * @apiSuccess {int} id  Unique id of the Candidate.
     * @apiSuccess {String} age  Age of the Candidate.
	 * @apiSuccess {String} experience  Candidate`s experience.
     * @apiSuccess {String} contacts  Candidate`s contacts.
     * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
     * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
     * @apiSuccess {int} level_id      Level of Candidate.
    * @apiSuccess {int} position_id    Position of Candidate.
    * @apiSuccess {base64} cv    CV of Candidate.
     * @apiSuccess {String} name    Name of candidate.
     * @apiSuccess {String} surname    Surname of candidate.
     * @apiSuccess {String} notes    Some notes for candidate.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
    {
    "status": "SUCCESS",
    "message": "Saved candidate",
    "data": {
        "id": 69,
        "age": 30,
        "experience": "test",
        "contacts": "test",
        "created_at": "2017-10-25T20:49:00.195Z",
        "updated_at": "2017-10-25T20:49:00.195Z",
        "level_id": 1,
        "position_id": 2,
        "cv": {
            "url": "/uploads/candidate/cv/69/cv.pdf"
        },
        "name": "Jim",
        "surname": "Jimson",
        "notes": "Some notes about Jim Jimson"
    }
}
   *
     * @apiError CandidateNotFound The <code>id</code> of the Candidate was not found.
     * @apiError Unauthorized Returned if the user is not logged in.
     */
     *=====EditCandidates======
     /**
     * @api {put} api/v1/candidates/:id Update candidate
     * @apiName PutCandidates
     * @apiGroup Candidates
     * @apiDescription Replace parts of existing candidate.
     *
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
     * @apiParam {int} level_id     Candidate`s level.
     * @apiParam {int} position_id  Candidate`s position.
     * @apiParam {String} [age]  Candidate`s age.
     * @apiParam {String} [experience]  Candidate`s experience.
     * @apiParam {String} contacts  Candidate`s contacts.
     * @apiParam {base64} [CV]  Candidate`s CV.
     * @apiParam {String} name    Name of candidate.
     * @apiParam {String} surname    Surname of candidate.
     * @apiParam {String} notes    Some notes for candidate.
     *
     * @apiParamExample {json} Request-Example:
      {
      "level_id": 1,
      "position_id": 2,
      "age": "30",
      "experience": "test",
      "contacts": "test",
      "cv": "data:application/pdf;base64, fw3...",
	  "name": "Jim",
	  "surname": "Jimson",
	  "notes": "Some notes about Jim Jimson fot put"
      }
     *
	* @apiSuccess {int} id  Unique id of the Candidate.
   * @apiSuccess {String} age  Age of the Candidate.   
   * @apiSuccess {String} experience  Candidate`s experience.
   * @apiSuccess {String} contacts  Candidate`s contacts.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} level_id      Level of Candidate.
   * @apiSuccess {int} position_id    Position of Candidate.
   * @apiSuccess {base64} cv    CV of Candidate.
     * @apiSuccess {String} name    Name of candidate.
     * @apiSuccess {String} surname    Surname of candidate.
     * @apiSuccess {String} notes    Some notes for candidate.
   *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
    "status": "SUCCESS",
    "message": "Update candidate",
    "data": {
        "id": 69,
        "age": 30,
        "experience": "test",
        "contacts": "test",
        "cv": {
            "url": "/uploads/candidate/cv/69/cv.pdf"
        },
        "level_id": 1,
        "position_id": 2,
        "name": "Jim",
        "surname": "Jimson",
        "notes": "Some notes about Jim Jimson fot put",
        "created_at": "2017-10-25T20:49:00.195Z",
        "updated_at": "2017-10-25T20:53:50.191Z"
    }
}
     * @apiError Unauthorized Returned if the user is not logged in.
     * @apiError CandidateNotFound Returned if the candidate does not exist.
     */

  *======PatchCandidate======
  /**
  * @api {patch} api/v1/candidate/:id Edit candidate
  * @apiName PatchCandidates
  * @apiGroup Candidates
  * @apiDescription Replace parts of existing candidate.
  *
  *
  * @apiHeader {String} content-type application/json; charset=utf-8
  * @apiHeader {String} accept application/json
  *
     * @apiParam {int} position_id  Candidate`s position.
     * @apiParam {String} [age]  Candidate`s age.
     * @apiParam {String} [experience]  Candidate`s experience.
     * @apiParam {String} contacts  Candidate`s contacts.
     * @apiParam {base64} [CV]  Candidate`s CV.
     * @apiParam {String} name    Name of candidate.
     * @apiParam {String} surname    Surname of candidate.
     * @apiParam {String} notes    Some notes for candidate.
     *
  * @apiParamExample {json} Request-Example:
    {
      "level_id": 1,
      "position_id": 2,
      "age": "30",
      "experience": "test",
      "contacts": "test",
      "cv": "data:application/pdf;base64, fw3...",
	  "name": "Jim",
	  "surname": "Jimson",
	  "notes": "Some notes about Jim Jimson fot pach"
      }
	  
 * @apiSuccess {int} id  Unique id of the Candidate.
   * @apiSuccess {String} age  Age of the Candidate.
   * @apiSuccess {String} experience  Candidate`s experience.
   * @apiSuccess {String} contacts  Candidate`s contacts.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} level_id      Level of Candidate.
   * @apiSuccess {int} position_id    Position of Candidate.
   * @apiSuccess {base64} cv    CV of Candidate.
     * @apiSuccess {String} name    Name of candidate.
     * @apiSuccess {String} surname    Surname of candidate.
     * @apiSuccess {String} notes    Some notes for candidate.
   *
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  *
  {
    "status": "SUCCESS",
    "message": "Update candidate",
    "data": {
        "id": 69,
        "age": 30,
        "experience": "test",
        "contacts": "test",
        "cv": {
            "url": "/uploads/candidate/cv/69/cv.pdf"
        },
        "level_id": 1,
        "position_id": 2,
        "name": "Jim",
        "surname": "Jimson",
        "notes": "Some notes about Jim Jimson fot patch",
        "created_at": "2017-10-25T20:49:00.195Z",
        "updated_at": "2017-10-25T20:51:38.429Z"
    }
}
  * @apiError Unauthorized Returned if the user is not logged in.
  * @apiError CandidateNotFound Returned if the candidate does not exist.
  */

  *======DeleteCandidate=======
  /**
   * @api {delete} api/v1/candidates/:id Delete Candidate
   * @apiName DeleteCandidates
   * @apiGroup Candidates
   *
   *
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   * @apiSuccess {int} id  Unique id of the Candidate.
   * @apiSuccess {String} age  Age of the Candidate.   
   * @apiSuccess {String} contacts  Candidate`s contacts.
   * @apiSuccess {String} experience  Candidate`s experience.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} level_id      Level of Candidate.
   * @apiSuccess {int} position_id    Position of Candidate.
   * @apiSuccess {base64} cv    CV of Candidate.
   
     * @apiSuccess {String} name    Name of candidate.
     * @apiSuccess {String} surname    Surname of candidate.
     * @apiSuccess {String} notes    Some notes for candidate.
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
 {
    "status": "SUCCESS",
    "message": "Candidate deleted",
    "data": {
        "id": 69,
        "age": 30,
        "experience": "test",
        "contacts": "test",
        "created_at": "2017-10-25T20:49:00.195Z",
        "updated_at": "2017-10-25T20:53:50.191Z",
        "level_id": 1,
        "position_id": 2,
        "cv": {
            "url": "/uploads/candidate/cv/69/cv.pdf"
        },
        "name": "Jim",
        "surname": "Jimson",
        "notes": "Some notes about Jim Jimson"
    }
}
   * @apiError Unauthorized Returned if the user is not logged in.
   * @apiError CandidateNotFound Returned if the candidate does not exist.
   */ 
   
   
   
   
  * ======================Interviews=====================
  *=====get======

  /**
   * @apiName GetInterviews
   * @apiGroup Interviews
   *
   * @api {get} api/v1/interviews/:id Get Interviews
   *
   *
   * @apiDescription Returns all Interviews which are visible for the currently logged in user.
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   * {
    "status": "SUCCESS",
    "message": "Interviews loaded",
    "data": [
        {
            "id": 20,
            "status": false,
            "state": "New",
            "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
            "date_time": "2017-10-16T00:40:00.000Z",
            "created_at": "2017-10-19T17:21:18.896Z",
            "updated_at": "2017-10-22T18:48:16.703Z",
            "candidate_id": 20,
            "vacancy_id": 47,
            "user_id": 19,
            "rating_id": 1
        }
   }
		
   * @apiSuccess {int} id  Unique id of the Interviews.
   * @apiSuccess {Boolen} status  Status of the Interviews(true/false).
   * @apiSuccess {String} state  State of the Interviews.
   * @apiSuccess {String} feedback  Feedback for Interviews.
   * @apiSuccess {String} date_time   Mandatory with data of interviews.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} candidate_id ID of candidate for this interviews.
   * @apiSuccess {int} vacancy_id  ID of vacancy for this interviews.
   * @apiSuccess {int} user_id  ID of user for this interviews.
   * @apiSuccess {int} rating_id  ID of rating for this interviews.

   *
   * @apiError InterviewsNotFound The <code>id</code> of the Interview was not found.
   * @apiError Unauthorized Returned if the user is not logged in.
   *
   */

   *========CreateInterviews======
    /**
     * @api {post} api/v1/interviews/ Create Interviews
     * @apiName PostInterviews
     * @apiGroup Interviews
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
     * @apiParam {Boolen} status  Status of the Interviews(true/false).
	 * @apiParam {String} state  State of the Interviews.
	 * @apiParam {String} feedback  Feedback for Interviews.
	 * @apiParam {String} date_time   Mandatory with data of interviews.
	 * @apiParam {int} candidate_id  ID of candidate for this interviews.
     * @apiParam {int} vacancy_id  ID of vacancy for this interviews.
     * @apiParam  {int} user_id  ID of user for this interviews.
     * @apiParam  {int} rating_id  ID of rating for this interviews.
     *
     * @apiParamExample {json} Request-Example:
     *
 {
	 "status": false,
     "state": "New",
     "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
    "date_time": "2017-10-16T00:40:00.000Z",
	"candidate_id": 3,
	"vacancy_id": 3,
	"user_id": 19,
	"rating_id": 2
	
}
 *
		
   * @apiSuccess {int} id  Unique id of the Interviews.
   * @apiSuccess {Boolen} status  Status of the Interviews(true/false).
   * @apiSuccess {String} state  State of the Interviews.
   * @apiSuccess {String} feedback  Feedback for Interviews.
   * @apiSuccess {String} date_time   Mandatory with data of interviews.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} candidate_id  ID of candidate for this interviews.
   * @apiSuccess {int} vacancy_id  ID of vacancy for this interviews.
   * @apiSuccess {int} user_id  ID of user for this interviews.
   * @apiSuccess {int} rating_id  ID of rating for this interviews.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
{
    "status": "SUCCESS",
    "message": "Saved interview",
    "data": {
        "id": 22,
        "status": false,
        "state": "New",
        "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
        "date_time": "2017-10-16T00:40:00.000Z",
        "created_at": "2017-10-24T06:02:51.719Z",
        "updated_at": "2017-10-24T06:02:51.719Z",
        "candidate_id": 3,
        "vacancy_id": 3,
        "user_id": 19,
        "rating_id": 2
    }
}
   *
     * @apiError InterviewsNotFound The <code>id</code> of the Interviews was not found.
     * @apiError Unauthorized Returned if the user is not logged in.
     */
     *=====EditInterviews======
     /**
     * @api {put} api/v1/interviews/:id Update Interviews
     * @apiName PutInterviews
     * @apiGroup Interviews
     * @apiDescription Replace parts of existing Rating.
     *
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
	      *
     * @apiParam {Boolen} status  Status of the Interviews(true/false).
	 * @apiParam {String} state  State of the Interviews.
	 * @apiParam {String} feedback  Feedback for Interviews.
	 * @apiParam {String} date_time   Mandatory with data of interviews.
	 * @apiParam {int} candidate_id  ID of candidate for this interviews.
     * @apiParam {int} vacancy_id  ID of vacancy for this interviews.
     * @apiParam  {int} user_id  ID of user for this interviews.
     * @apiParam  {int} rating_id  ID of rating for this interviews.
     *
     * @apiParamExample {json} Request-Example:
    {
	 "status": false,
     "state": "Not new",
     "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.EDIT",
    "date_time": "2017-10-16T00:40:00.000Z",
	"candidate_id": 3,
	"vacancy_id": 3,
	"user_id": 19,
	"rating_id": 2
	
	}
     *
	 
   * @apiSuccess {int} id  Unique id of the Interviews.
   * @apiSuccess {Boolen} status  Status of the Interviews(true/false).
   * @apiSuccess {String} state  State of the Interviews.
   * @apiSuccess {String} feedback  Feedback for Interviews.
   * @apiSuccess {String} date_time   Mandatory with data of interviews.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} candidate_id  ID of candidate for this interviews.
   * @apiSuccess {int} vacancy_id  ID of vacancy for this interviews.
   * @apiSuccess {int} user_id  ID of user for this interviews.
   * @apiSuccess {int} rating_id  ID of rating for this interviews.
   *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
{
    "status": "SUCCESS",
    "message": "Update interview",
    "data": {
        "id": 22,
        "status": false,
        "state": "Not new",
        "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.EDIT",
        "date_time": "2017-10-16T00:40:00.000Z",
        "candidate_id": 3,
        "vacancy_id": 3,
        "user_id": 19,
        "rating_id": 2,
        "created_at": "2017-10-24T06:02:51.719Z",
        "updated_at": "2017-10-24T06:09:11.774Z"
    }
}
     * @apiError Unauthorized Returned if the user is not logged in.
     * @apiError InterviewsNotFound Returned if the Interviews does not exist.
     */

  *======PachInterviews======
  /**
  * @api {pach} api/v1/interviews/:id Edit Interviews
  * @apiName PatchInterviews
  * @apiGroup Interviews
  * @apiDescription Replace parts of existing Interviews.
  *
  *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
	      *
     * @apiParam {Boolen} status  Status of the Interviews(true/false).
	 * @apiParam {String} state  State of the Interviews.
	 * @apiParam {String} feedback  Feedback for Interviews.
	 * @apiParam {String} date_time   Mandatory with data of interviews.
	 * @apiParam {int} candidate_id  ID of candidate for this interviews.
     * @apiParam {int} vacancy_id  ID of vacancy for this interviews.
     * @apiParam  {int} user_id  ID of user for this interviews.
     * @apiParam  {int} rating_id  ID of rating for this interviews.
     *
     * @apiParamExample {json} Request-Example:
    {
	 "status": false,
     "state": "Not new",
     "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.EDIT",
    "date_time": "2017-10-16T00:40:00.000Z",
	"candidate_id": 3,
	"vacancy_id": 3,
	"user_id": 19,
	"rating_id": 2
	
	}
     *
	 
   * @apiSuccess {int} id  Unique id of the Interviews.
   * @apiSuccess {Boolen} status  Status of the Interviews(true/false).
   * @apiSuccess {String} state  State of the Interviews.
   * @apiSuccess {String} feedback  Feedback for Interviews.
   * @apiSuccess {String} date_time   Mandatory with data of interviews.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} candidate_id  ID of candidate for this interviews.
   * @apiSuccess {int} vacancy_id  ID of vacancy for this interviews.
   * @apiSuccess {int} user_id  ID of user for this interviews.
   * @apiSuccess {int} rating_id  ID of rating for this interviews.
	 
   *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
{
    "status": "SUCCESS",
    "message": "Update interview",
    "data": {
        "id": 22,
        "status": false,
        "state": "Not new",
        "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.EDIT",
        "date_time": "2017-10-16T00:40:00.000Z",
        "candidate_id": 3,
        "vacancy_id": 3,
        "user_id": 19,
        "rating_id": 2,
        "created_at": "2017-10-24T06:02:51.719Z",
        "updated_at": "2017-10-24T06:09:11.774Z"
    }
}
     * @apiError Unauthorized Returned if the user is not logged in.
     * @apiError InterviewsNotFound Returned if the Interviews does not exist.
     */

  *======DeleteInterviews=======
  /**
   * @api {delete} api/v1/interviews/:id Delete Interviews
   * @apiName DeleteInterviews
   * @apiGroup Interviews
   *
   *
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
 
   * @apiSuccess {int} id  Unique id of the Interviews.
   * @apiSuccess {Boolen} status  Status of the Interviews(true/false).
   * @apiSuccess {String} state  State of the Interviews.
   * @apiSuccess {String} feedback  Feedback for Interviews.
   * @apiSuccess {String} date_time   Mandatory with data of interviews.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   * @apiSuccess {int} candidate_id  ID of candidate for this interviews.
   * @apiSuccess {int} vacancy_id  ID of vacancy for this interviews.
   * @apiSuccess {int} user_id  ID of user for this interviews.
   * @apiSuccess {int} rating_id  ID of rating for this interviews. 
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
{
    "status": "SUCCESS",
    "message": "Interview deleted",
    "data": {
        "id": 22,
        "status": false,
        "state": "Non new2",
        "feedback": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.Patch",
        "date_time": "2017-10-16T00:40:00.000Z",
        "created_at": "2017-10-24T06:02:51.719Z",
        "updated_at": "2017-10-24T06:11:05.592Z",
        "candidate_id": 3,
        "vacancy_id": 3,
        "user_id": 19,
        "rating_id": 2
    }
}
  * @apiError Unauthorized Returned if the user is not logged in.
   * @apiError InterviewsNotFound Returned if the Interviews does not exist.
   */


   
   
   
   
     * =======================Ratings====================
  *=====get======

  /**
   * @apiName GetRatings
   * @apiGroup Ratings
   *
   * @api {get} api/v1/ratings/:id Get Ratings
   *
   *
   * @apiDescription Returns all Ratings which are visible for the currently logged in user.
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *  {
    "status": "SUCCESS",
    "message": "Ratings loaded",
    "data": [
        {
            "id": 5,
            "grade": "Supa Good",
            "created_at": "2017-10-10T23:23:08.582Z",
            "updated_at": "2017-10-20T12:17:10.368Z"
        }}
		
   * @apiSuccess {int} id  Unique id of the Rating.
   * @apiSuccess {String} grade  Grade of the Rating.
   * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
   * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   *
   * @apiError RatingNotFound The <code>id</code> of the Rating was not found.
   * @apiError Unauthorized Returned if the user is not logged in.
   *
   */

   *========CreateRating======
    /**
     * @api {post} api/v1/ratings/ Create Rating
     * @apiName PostRating
     * @apiGroup Ratings
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
     * @apiParam {String} grade  Grade of ratings.
     *
     * @apiParamExample {json} Request-Example:
     *
     {
	"grade": "test"
	}
     *
     * @apiSuccess {int} id  Unique id of rating.
     * @apiSuccess {String} grade  Grade of the rating.
     * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
     * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     {
    "status": "SUCCESS",
    "message": "Saved rating",
    "data": {
        "id": 7,
        "grade": "test",
        "created_at": "2017-10-23T18:17:39.083Z",
        "updated_at": "2017-10-23T18:17:39.083Z"
    }
}
   *
     * @apiError RatingNotFound The <code>id</code> of the Rating was not found.
     * @apiError Unauthorized Returned if the user is not logged in.
     */
     *=====EditRating======
     /**
     * @api {put} api/v1/ratings/:id Update Rating
     * @apiName PutRating
     * @apiGroup Ratings
     * @apiDescription Replace parts of existing Rating.
     *
     *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
	 * @apiParam {String} grade  Grade of ratings.
     *
     * @apiParamExample {json} Request-Example:
      {
	"grade": "test1"
	}
     *
     * @apiSuccess {int} id  Unique id of rating.
     * @apiSuccess {String} grade  Grade of the rating.
     * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
     * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
  {
    "status": "SUCCESS",
    "message": "Update rating",
    "data": {
        "id": 6,
        "grade": "test1",
        "created_at": "2017-10-23T18:16:48.015Z",
        "updated_at": "2017-10-23T18:29:17.152Z"
    }
}
     * @apiError Unauthorized Returned if the user is not logged in.
     * @apiError RatingNotFound Returned if the rating does not exist.
     */

  *======PachRating======
  /**
  * @api {pach} api/v1/ratings/:id Edit rating
  * @apiName PatchRating
  * @apiGroup Ratings
  * @apiDescription Replace parts of existing rating.
  *
  *
     * @apiHeader {String} content-type application/json; charset=utf-8
     * @apiHeader {String} accept application/json
     *
	 * @apiParam {String} grade  Grade of ratings.
     *
     * @apiParamExample {json} Request-Example:
      {
	"grade": "test1"
	}
     *
     * @apiSuccess {int} id  Unique id of rating.
     * @apiSuccess {String} grade  Grade of the rating.
     * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
     * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
   *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
{
    "status": "SUCCESS",
    "message": "Update rating",
    "data": {
        "id": 6,
        "grade": "test2",
        "created_at": "2017-10-23T18:16:48.015Z",
        "updated_at": "2017-10-23T18:45:13.614Z"
    }
}
     * @apiError Unauthorized Returned if the user is not logged in.
     * @apiError RatingNotFound Returned if the rating does not exist.
     */

  *======DeleteRating=======
  /**
   * @api {delete} api/v1/ratings/:id Delete Rating
   * @apiName DeleteRating
   * @apiGroup Ratings
   *
   *
   *
   * @apiHeader {String} content-type application/json; charset=utf-8
   * @apiHeader {String} accept application/json
   *
  * @apiSuccess {int} id  Unique id of rating.
     * @apiSuccess {String} grade  Grade of the rating.
     * @apiSuccess {String} created_at    Mandatory with data of creating(By default).
     * @apiSuccess {String} updated_at    Mandatory with data of update(By default).
    
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
  {
    "status": "SUCCESS",
    "message": "Rating deleted",
    "data": {
        "id": 6,
        "grade": "test2",
        "created_at": "2017-10-23T18:16:48.015Z",
        "updated_at": "2017-10-23T18:45:13.614Z"
    }
}

  * @apiError Unauthorized Returned if the user is not logged in.
   * @apiError RatingNotFound Returned if the rating does not exist.
   */