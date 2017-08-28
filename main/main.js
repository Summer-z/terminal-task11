let question = require('cli-interact').question;
let yesNo = require('cli-interact').getYesNo;
let num = require('cli-interact').getNumber;

function findMedian(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });
    let len = arr.length;
    if (len % 2 !== 0) {
        return arr[Math.floor(len / 2)];
    } else {
        return (arr[len / 2] + arr[len / 2 - 1]) / 2;
    }
}

function printStudentInfo(arr, allStudentInfo) {
    let info = '';
    let temp = [];
    let allSum = 0;
    let sumArr = [];
    allStudentInfo.forEach(item => {
        arr.forEach(ele => {
            if (item.id === parseInt(ele)) {
                temp.push(item);
            }
        })
    });
    temp.forEach(item => {
        let chinese = item.achievement.Chinese;
        let english = item.achievement.English;
        let math = item.achievement.Math;
        let sum = chinese + english + math;
        sumArr.push(sum);
        let average = parseFloat(sum / 3).toFixed(2);
        info += `${item.name}|${chinese}|${english}|${math}|${average}|${sum}\n`;
        allSum += sum;
    });
    let allAverage = parseFloat(allSum / arr.length).toFixed(2);
    let median = parseFloat(findMedian(sumArr)).toFixed(2);
    return `成绩单
姓名|语文|英语|数学|平均分|总分
========================
${info}========================
全班总分平均数：${allAverage}
全班总分中位数：${median}`;
}

function getStudentId(printInfo, allStudentInfo) {
    let arr = printInfo.split(' ');
    let result = [];
    arr = arr.map(ele => parseInt(ele));
    allStudentInfo.forEach(item => {
        arr.forEach(ele => {
            if (item.id === ele) {
                result.push(ele);
            }
        })
    });
    return (result);
}

function addStudentInfo(arr, allStudentInfo) {
    let index = allStudentInfo.length;
    allStudentInfo.push({
        name: arr[0],
        id: parseInt(arr[1]),
        achievement: {Chinese: parseInt(arr[4]), English: parseInt(arr[5]), Math: parseInt(arr[6])}
    });
    let currentStudent = allStudentInfo[index];
    console.log(`学生${currentStudent.name}的成绩被添加，添加的成绩单如下：`);
    console.log(`姓名：${currentStudent.name}
学号：${currentStudent.id}
语文：${currentStudent.achievement.Chinese} 英语：${currentStudent.achievement.English} 数学：${currentStudent.achievement.Math}`);
    if (!yesNo(`请核对信息`)) {
        allStudentInfo.pop();
        console.log(`提示：添加学生信息不成功！`);
    } else {
        console.log(`提示：您输入的学生信息已被录入，请您继续选择`)
    }
    return allStudentInfo;
}

function getStudentInfo(studentInfo) {
    let arr = studentInfo.split(' ');
    if (arr.length === 7) {
        return arr;
    }
}

function buildMainMenu() {
    return `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`
}
function main(allStudentInfo) {
    switch (num(buildMainMenu())) {
        case 1:
            let studentInfo = question(`请输入学生信息（姓名 学号 民族 班级 语文成绩 英语成绩 数学成绩），按回车提交：`);
            while (true) {
                if (getStudentInfo(studentInfo)) {
                    break;
                }
                studentInfo = question(`请按正确的格式输入（姓名 学号 民族 班级 语文成绩 英语成绩 数学成绩）：`);
            }
            addStudentInfo(getStudentInfo(studentInfo), allStudentInfo);
            main(allStudentInfo);
            break;
        case 2:
            let printInfo = question(`请输入要打印的学生的学号（学号 学号 学号 ...），按回车提交：`);
            while (true) {
                if (getStudentId(printInfo, allStudentInfo)) {
                    break;
                }
                printInfo = question(`请按正确的格式输入要打印的学生的学号（学号 学号 学号 ...），按回车提交：`);
            }
            let idArr = getStudentId(printInfo, allStudentInfo);
            if (!idArr) {
                console.log(`提示：您输入的学号有误，请查询后重新输入！`);
                main();
            } else {
                console.log(printStudentInfo(idArr, allStudentInfo));
            }
            main(allStudentInfo);
            break;
        case 3:
            if (yesNo(`您确定退出程序`)) {
                console.log(`---------Bye Bye--------`);
            } else {
                main(allStudentInfo);
            }
            break;
        default:
            console.log(`提示：请输入数字（1~3）！`);
            main(allStudentInfo);
            break;
    }
}
module.exports = main;
let allStudentInfo = [];
main(allStudentInfo);