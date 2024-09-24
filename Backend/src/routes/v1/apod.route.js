const express = require('express');
const apodController = require('../../controllers/apod.controller');

const router = express.Router();

router.route('/').get(apodController.getApod);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: APOD
 *   description: NASA APOD data retrieval
 */

/**
 * @swagger
 * /apod:
 *   get:
 *     summary: Get APOD data
 *     description: Retrieve the latest APOD data from NASA.
 *     tags: [APOD]
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
 *                 title:
 *                   type: string
 *                 explanation:
 *                   type: string
 *                 url:
 *                   type: string
 *                 hdurl:
 *                   type: string
 *                 media_type:
 *                   type: string
 *                   items:
 *                     type: string
 *                 validity_checks:
 *                   type: object
 *                 date:
 *                   type: string
 *                 service_version:
 *                   type: string
 *                 copyright:
 *                   type: string
 *                 # Add other properties based on the actual API response
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         description: Internal Server Error
 */
