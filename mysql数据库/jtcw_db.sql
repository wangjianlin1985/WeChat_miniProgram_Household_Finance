/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50051
Source Host           : localhost:3306
Source Database       : jtcw_db

Target Server Type    : MYSQL
Target Server Version : 50051
File Encoding         : 65001

Date: 2019-11-05 16:12:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL default '',
  `password` varchar(32) default NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('a', 'a');

-- ----------------------------
-- Table structure for `t_expend`
-- ----------------------------
DROP TABLE IF EXISTS `t_expend`;
CREATE TABLE `t_expend` (
  `expendId` int(11) NOT NULL auto_increment COMMENT '支出id',
  `expendTypeObj` int(11) NOT NULL COMMENT '支出类型',
  `expendPurpose` varchar(50) NOT NULL COMMENT '支出用途',
  `payWayObj` int(11) NOT NULL COMMENT '支付方式',
  `payAccount` varchar(50) default NULL COMMENT '支付账号',
  `expendMoney` float NOT NULL COMMENT '支付金额',
  `expendDate` varchar(20) default NULL COMMENT '支付日期',
  `userInfoObj` varchar(40) NOT NULL COMMENT '用户',
  `memo` varchar(500) default NULL COMMENT '备忘信息',
  PRIMARY KEY  (`expendId`),
  KEY `expendTypeObj` (`expendTypeObj`),
  KEY `payWayObj` (`payWayObj`),
  KEY `userInfoObj` (`userInfoObj`),
  CONSTRAINT `t_expend_ibfk_3` FOREIGN KEY (`userInfoObj`) REFERENCES `t_userinfo` (`user_name`),
  CONSTRAINT `t_expend_ibfk_1` FOREIGN KEY (`expendTypeObj`) REFERENCES `t_expendtype` (`expendTypeId`),
  CONSTRAINT `t_expend_ibfk_2` FOREIGN KEY (`payWayObj`) REFERENCES `t_payway` (`payWayId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_expend
-- ----------------------------
INSERT INTO `t_expend` VALUES ('1', '1', '买冬装', '1', 'dashen@163.com', '350', '2019-11-04', '13688886666', '发了工资高兴');
INSERT INTO `t_expend` VALUES ('2', '1', '买内衣裤', '1', 'xiaowang@126.com', '55', '2019-11-05', '13866668888', '好久没买了');

-- ----------------------------
-- Table structure for `t_expendtype`
-- ----------------------------
DROP TABLE IF EXISTS `t_expendtype`;
CREATE TABLE `t_expendtype` (
  `expendTypeId` int(11) NOT NULL auto_increment COMMENT '支出类型id',
  `expendTypeName` varchar(40) NOT NULL COMMENT '支出类型名称',
  PRIMARY KEY  (`expendTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_expendtype
-- ----------------------------
INSERT INTO `t_expendtype` VALUES ('1', '衣服');

-- ----------------------------
-- Table structure for `t_income`
-- ----------------------------
DROP TABLE IF EXISTS `t_income`;
CREATE TABLE `t_income` (
  `incomeId` int(11) NOT NULL auto_increment COMMENT '收入id',
  `incomeTypeObj` int(11) NOT NULL COMMENT '收入类型',
  `incomeFrom` varchar(40) NOT NULL COMMENT '收入来源',
  `payWayObj` int(11) NOT NULL COMMENT '支付方式',
  `payAccount` varchar(50) default NULL COMMENT '收入账号',
  `incomeMoney` float NOT NULL COMMENT '收入金额',
  `incomeDate` varchar(20) default NULL COMMENT '收入日期',
  `userObj` varchar(40) NOT NULL COMMENT '用户',
  `memo` varchar(500) default NULL COMMENT '备注',
  PRIMARY KEY  (`incomeId`),
  KEY `incomeTypeObj` (`incomeTypeObj`),
  KEY `payWayObj` (`payWayObj`),
  KEY `userObj` (`userObj`),
  CONSTRAINT `t_income_ibfk_3` FOREIGN KEY (`userObj`) REFERENCES `t_userinfo` (`user_name`),
  CONSTRAINT `t_income_ibfk_1` FOREIGN KEY (`incomeTypeObj`) REFERENCES `t_incometype` (`incomeTypeId`),
  CONSTRAINT `t_income_ibfk_2` FOREIGN KEY (`payWayObj`) REFERENCES `t_payway` (`payWayId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_income
-- ----------------------------
INSERT INTO `t_income` VALUES ('1', '1', '单位', '1', 'dashen@163.com', '3600', '2019-11-05', '13688886666', '测试');
INSERT INTO `t_income` VALUES ('2', '1', '10月工资', '1', 'xiaowang@126.com', '4250', '2019-11-05', '13866668888', '测试收入');

-- ----------------------------
-- Table structure for `t_incometype`
-- ----------------------------
DROP TABLE IF EXISTS `t_incometype`;
CREATE TABLE `t_incometype` (
  `incomeTypeId` int(11) NOT NULL auto_increment COMMENT '收入类别id',
  `incomeTypeName` varchar(20) NOT NULL COMMENT '收入类别名称',
  PRIMARY KEY  (`incomeTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_incometype
-- ----------------------------
INSERT INTO `t_incometype` VALUES ('1', '工资');

-- ----------------------------
-- Table structure for `t_notice`
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice` (
  `noticeId` int(11) NOT NULL auto_increment COMMENT '记录id',
  `title` varchar(100) NOT NULL COMMENT '标题',
  `content` varchar(5000) NOT NULL COMMENT '内容',
  `addDate` varchar(20) default NULL COMMENT '发布日期',
  PRIMARY KEY  (`noticeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_notice
-- ----------------------------
INSERT INTO `t_notice` VALUES ('1', '家庭财务上线了', '小程序平台可以登记你的收支信息了', '2019-11-05');

-- ----------------------------
-- Table structure for `t_payway`
-- ----------------------------
DROP TABLE IF EXISTS `t_payway`;
CREATE TABLE `t_payway` (
  `payWayId` int(11) NOT NULL auto_increment COMMENT '支付方式id',
  `payWayName` varchar(50) NOT NULL COMMENT '支付方式名称',
  PRIMARY KEY  (`payWayId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_payway
-- ----------------------------
INSERT INTO `t_payway` VALUES ('1', '支付宝');

-- ----------------------------
-- Table structure for `t_userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `t_userinfo`;
CREATE TABLE `t_userinfo` (
  `user_name` varchar(40) NOT NULL COMMENT 'user_name',
  `password` varchar(20) NOT NULL COMMENT '登录密码',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `sex` varchar(4) NOT NULL COMMENT '性别',
  `homeName` varchar(30) NOT NULL COMMENT '家庭关系',
  `workName` varchar(20) NOT NULL COMMENT '职业',
  `birthday` varchar(20) default NULL COMMENT '出生日期',
  `userPhoto` varchar(60) NOT NULL COMMENT '用户照片',
  `address` varchar(80) default NULL COMMENT '工作地址',
  `openid` varchar(100) default NULL,
  PRIMARY KEY  (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_userinfo
-- ----------------------------
INSERT INTO `t_userinfo` VALUES ('13688886666', '123', '--', '--', '--', '--', '2019-11-05', 'upload/NoImage.jpg', '--', null);
INSERT INTO `t_userinfo` VALUES ('13866668888', '123', '鼠鼠', '男', '父亲', '程序员', '1990-01-01', 'upload/04edc3fbd38a4256be1c621ea2c8ad3a', '成都红星路', 'oM7Mu5XyeVJSc8roaUCRlcz_IP9k');
