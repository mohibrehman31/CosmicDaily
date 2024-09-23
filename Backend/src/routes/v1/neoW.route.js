const express = require('express');
const neoWController = require('../../controllers/neoW.controller');

const router = express.Router();

router.route('/threat-dashboard').get(neoWController.getThreatLevelDashboard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Asteroids
 *   description: Near Earth Object (NEO) asteroid data and threat assessment
 */

/**
 * @swagger
 * /asteroids/threat-dashboard:
 *   get:
 *     summary: Get Asteroid Threat Level Dashboard
 *     description: Retrieve asteroid threat level data for a specified date range.
 *     tags: [Asteroids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for asteroid data (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for asteroid data (YYYY-MM-DD)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAsteroids:
 *                   type: integer
 *                   description: Total number of asteroids in the given date range
 *                 threatLevelBreakdown:
 *                   type: object
 *                   properties:
 *                     Low:
 *                       type: integer
 *                     Medium:
 *                       type: integer
 *                     High:
 *                       type: integer
 *                     Extreme:
 *                       type: integer
 *                   description: Breakdown of asteroids by threat level
 *                 closestApproach:
 *                   type: number
 *                   description: Distance in kilometers of the closest asteroid approach
 *                 highestThreatAsteroid:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     diameter:
 *                       type: number
 *                     velocity:
 *                       type: number
 *                     missDistance:
 *                       type: number
 *                     threatScore:
 *                       type: number
 *                     threatLevel:
 *                       type: string
 *                   description: Details of the asteroid with the highest threat score
 *                 asteroids:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
 *                       diameter:
 *                         type: number
 *                       velocity:
 *                         type: number
 *                       missDistance:
 *                         type: number
 *                       threatScore:
 *                         type: number
 *                       threatLevel:
 *                         type: string
 *                   description: List of all asteroids with their threat assessments
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Start date and end date are required
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */
