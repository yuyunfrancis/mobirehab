/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: The patients managing API
 * /signup:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               guardianPhoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   city:
 *                     type: string
 *                   district:
 *                     type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid patient data
 *       500:
 *         description: Internal server error
 * /login:
 *   post:
 *     summary: Login a patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid patient credentials
 *       500:
 *         description: Internal server error
 * /logout:
 *   post:
 *     summary: Logout a patient
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Patient logged out successfully
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         patientId:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         age:
 *           type: integer
 *         profilePicture:
 *           type: string
 *         cloudinaryId:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         guardianPhoneNumber:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *             city:
 *               type: string
 *             district:
 *               type: string
 *         password:
 *           type: string
 *         userType:
 *           type: string
 *           default: patient
 */
