// simple_task_management_system.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];
let tasks = [];

// 用户注册
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // 实现用户注册逻辑，将用户信息保存到数据库中
    users.push({ username, password });
    res.status(201).json({ message: '用户注册成功' });
});

// 创建任务
app.post('/createTask', (req, res) => {
    const { username, taskName } = req.body;
    // 实现创建任务逻辑，保存任务到数据库中
    tasks.push({ username, taskName, completed: false });
    res.status(201).json({ message: '任务创建成功' });
});

// 标记任务完成
app.put('/completeTask/:taskId', (req, res) => {
    const { taskId } = req.params;
    // 实现标记任务完成逻辑，更新任务状态为已完成
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        res.status(404).json({ message: '任务未找到' });
        return;
    }
    task.completed = true;
    res.status(200).json({ message: '任务已完成' });
});

// 监听端口
const port = 3000;
app.listen(port, () => {
    console.log(`简单任务管理系统后端运行在 http://localhost:${port}`);
});
