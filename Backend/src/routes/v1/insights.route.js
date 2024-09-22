const express = require('express');
const insightController = require('../../controllers/insights.controller');

const router = express.Router();

router.route('/').get(insightController.getInsight);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Insight
 *   description: NASA InSight weather data retrieval
 */

/**
 * @swagger
 * /insight:
 *   get:
 *     summary: Get InSight weather data
 *     description: Retrieve the latest weather data from NASA's InSight Mars lander.
 *     tags: [Insight]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sol_keys:
 *                   type: array
 *                   items:
 *                     type: string
 *                 validity_checks:
 *                   type: object
 *                 # Add other properties based on the actual API response
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         description: Internal Server Error
 */
