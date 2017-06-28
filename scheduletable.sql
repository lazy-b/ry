/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : rytestdemo

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-28 13:50:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for scheduletable
-- ----------------------------
DROP TABLE IF EXISTS `scheduletable`;
CREATE TABLE `scheduletable` (
  `id` varchar(40) NOT NULL,
  `orderNo` varchar(30) DEFAULT NULL,
  `productName` varchar(20) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `reciverOrder` datetime DEFAULT NULL,
  `planPrductTime` datetime DEFAULT NULL,
  `productStatus` int(11) DEFAULT NULL COMMENT '0:未开始，1：开始生产',
  `planProductFinish` datetime DEFAULT NULL,
  `productFinishStatus` int(11) DEFAULT NULL COMMENT '0:未完成1：已完成',
  `planOrderFinish` datetime DEFAULT NULL,
  `orderFinishStatus` int(11) DEFAULT NULL COMMENT '0：订单未完成 1：订单已完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scheduletable
-- ----------------------------
INSERT INTO `scheduletable` VALUES ('1', 'PO2017055', 'PD35筒身', '0', '2017-06-26 20:06:29', '2017-06-26 20:06:33', '0', '2017-06-26 20:06:51', '0', '2017-06-27 20:06:59', '0');
INSERT INTO `scheduletable` VALUES ('2', 'PO2017055', 'PD32筒身', '0', '2017-06-26 20:06:29', '2017-06-26 20:06:33', '0', '2017-06-26 20:06:51', '0', '2017-06-27 20:06:59', '0');
INSERT INTO `scheduletable` VALUES ('3', 'PO2017055', 'TK15筒身', '0', '2017-06-27 20:06:29', '2017-06-26 20:06:33', '0', '2017-06-27 20:06:51', '0', '2017-06-27 20:06:59', '0');
