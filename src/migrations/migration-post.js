'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            advisor_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            public_date: {
                allowNull: true,
                type: Sequelize.STRING
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
};