const ProjectRouter = require('express').Router();

ProjectRouter.post('/', async (req,res) => {
    try {

        
        res.json({
            message: "This route is still under progress..."
        })
    } catch (error) {
        logger.error(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
})

ProjectRouter.get('/:userID', async (req,res) => {

})

ProjectRouter.post('/:projectID', async (req,res) => {

})

module.exports = ProjectRouter;