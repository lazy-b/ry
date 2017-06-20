/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : jkk

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-20 17:33:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for orderinformation
-- ----------------------------
DROP TABLE IF EXISTS `orderinformation`;
CREATE TABLE `orderinformation` (
  `orderInformationId` varchar(40) CHARACTER SET utf8 NOT NULL,
  `orderDate` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `requiredDate` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `orderNo` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `materialCoding` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `productName` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `orderAmount` int(11) DEFAULT NULL,
  `spareParts` int(11) DEFAULT NULL,
  `stockAmount` double DEFAULT NULL,
  `planAmount` int(11) DEFAULT NULL,
  `materialModel` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `purchaseRequirement` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `replyDate` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `orderStatus` int(11) DEFAULT NULL,
  `exceptionReason` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `price` double DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `orderType` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderInformationId`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of orderinformation
-- ----------------------------
INSERT INTO `orderinformation` VALUES ('0cf248d7-49fb-4ae2-95ce-83afc978babc', '\"2017-6-20\"', '56', 'PO201752802', '11.210.002.003', 'TK777筒身', '5000', '30', '25', '5035', '白件', '35', '56', '654', '56', '56', '65', '65');
INSERT INTO `orderinformation` VALUES ('1', '2017-05-27', '2017-06-15', 'PO201752802', '11.210.310.225', 'PD35筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', null, '2.3', null, null);
INSERT INTO `orderinformation` VALUES ('10', '2017-05-30', '2017-06-27', 'PO201752802', '11.210.310.225', 'PD35反光杯', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('16c974cc-0dd9-41db-a62e-6cad74ebfc4e', '2017-6-20', '2017-7-20', 'PO20170566', '11.310.210.003', 'PD88筒尾', '5000', '20', '50', '5050', '25.6*8', '白件', '2014-7-29', '1', '掉氧', '8', '6-20交货3000', '1');
INSERT INTO `orderinformation` VALUES ('18ef1c25-6fda-4e1c-941d-cd04571908e9', '2017-6-20', '2017-6-28', 'PO20170566', '11.210.002.065', 'PD199筒尾', '1000', '20', '20', '1020', '白件', '白件', '2014-7-22', '1', '无', '5', '泛白', '1');
INSERT INTO `orderinformation` VALUES ('1acad4be-fc92-43f0-b880-510b548fe336', '\"2017-06-15\"', '\"2017-06-19\"', '\"PO201752802\"', '\"11.210.310.225\"', '\"PD695筒头\"', '3800', '20', '10', '380', '\"白件\"', '\"35.6二次加工\"', '\"2017-06-19\"', '1', '\"碰伤\"', '2.3', '\"6-2交货2000\"', '1');
INSERT INTO `orderinformation` VALUES ('2', '2017-05-16', '2017-06-15', 'PO201752802', '11.210.310.225', 'PD32筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '退货', null);
INSERT INTO `orderinformation` VALUES ('2052e7ef-63c2-4ce9-89d2-c884c7cb15ae', '\"2017-6-20\"', '\"2017-7-20\"', '\"PO20170566\"', '\"11.310.210.003\"', '\"PD899筒尾\"', '5000', '20', '50', '5050', '\"\'25.6*8\"', '\"白件\"', '\"2014-7-29\"', '1', '\"碰伤\"', '8', '\"6-20交货2000\"', '1');
INSERT INTO `orderinformation` VALUES ('22', '2017-05-08', '2017-06-23', 'PO201752802', '11.210.310.225', 'PD35筒头', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('3', '2017-05-27', '2017-06-22', 'PO201752802', '11.210.310.225', 'FD50筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('5', '2017-05-27', '2017-06-15', 'PO201752802', '11.210.310.225', 'PD35筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('5d169c66-abd9-44b3-a0e1-2cf381127c19', '2017-05-23', '2017-06-21', 'PO201752802', '11.210.310.225', 'TK155筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', null, '2.3', null, '1');
INSERT INTO `orderinformation` VALUES ('5f2b5cd9-78d1-4555-a9e0-b74159ca6a83', '2017-6-18', '2017-7-20', 'PO20170255', '11.210.006.005', 'PD852筒身', '7000', '70', null, '7070', '白件', '白件', '2017-7-18', '1', '碰伤', '8', '碰伤', '1');
INSERT INTO `orderinformation` VALUES ('6', '2017-05-15', '2017-06-19', 'PO201752802', '11.210.310.225', 'PD35筒尾', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('7', '2017-05-23', '2017-06-21', 'PO201752802', '11.210.310.225', 'TK15筒身', '3000', '20', '10', '3020', '白件', '25.6/3二次加工', '2017-06-16', '1', '', '2.3', '', null);
INSERT INTO `orderinformation` VALUES ('76cd0df6-4507-4e6f-896c-ef284db94dd1', '\"2017-6-20\"', '\"2017-7-20\"', '\"PO20170566\"', '\"11.310.210.003\"', '\"PD444筒尾\"', '5000', '20', '50', '5050', '\"\'25.6*8\"', '\"白件\"', '\"2014-7-29\"', '1', '\"碰伤\"', '8', '\"6-20交货2000\"', '1');
INSERT INTO `orderinformation` VALUES ('78c22f3b-b80e-46ce-a88f-9c2284c346dd', '2017-6-20', '2017-6-28', 'PO20170566', '11.210.002.065', 'PD100筒尾', '1000', '20', '20', '1020', '白件', '白件', '2014-7-22', '1', '无', '5', '泛白', '1');
INSERT INTO `orderinformation` VALUES ('88', '2017-06-08', '2017-06-23', 'PO20175111', '11.210.310.225', 'PD35筒尾', '3000', '20', '10', '3020', '白件', '二次加工', '2017-06-16', '1', ' ', '9.9', ' ', '0');
INSERT INTO `orderinformation` VALUES ('9a4e2b69-409b-43a3-a019-914fab3ddeac', '2017-6-20', '2017-7-20', 'PO20170566', '11.310.210.003', 'PD89筒尾', '5000', '20', '50', '5050', '25.6*8', '白件', '2014-7-29', '1', '掉氧', '8', '6-20交货3000', '1');
INSERT INTO `orderinformation` VALUES ('aa75121b-09b5-42e1-8fbb-4c3224f01d95', '2017-6-29', '2017-7-20', 'PO20170566', '11.210.335.006', 'PD665筒尾', '6000', '30', '20', '6030', '白件', '白件', '2014-8-22', '1', '碰伤', '5', null, '1');
INSERT INTO `orderinformation` VALUES ('b4390aed-79ae-4719-8faf-9c40ed3827e0', '2017-06-27', '2017-07-19', 'PO201752802', '11.210.310.225', 'PD55筒头', '3600', '30', '20', '3620', '白件', '25.6二次加工', '2017-06-16', '1', '碰伤', '2.3', '6-2交货2000', '1');
INSERT INTO `orderinformation` VALUES ('b4f0b396-c250-44a0-9f81-bd5b11b8d196', '2017-5-28', '2017-6-28', 'PO20170566', '11.310.220.003', 'PD265筒身', '5000', '30', '20', '5030', '白件', '白件', '2017-06-16', '1', '碰伤', '8', '交货', '1');
INSERT INTO `orderinformation` VALUES ('b7b2e27d-8ac3-4054-9a27-45a8f1b2f036', '\"2017-05-15\"', '\"2017-06-19\"', '\"PO201752802\"', '\"11.210.310.225\"', '\"PD40筒头\"', '3500', '20', '10', '3520', '\"白件\"', '\"25.6二次加工\"', '\"2017-06-16\"', '1', '\"碰伤\"', '2.3', '\"6-2交货2000\"', '1');
INSERT INTO `orderinformation` VALUES ('c078926b-206e-4eba-866d-4c9283226b7d', '2017-6-22', '2017-6-25', 'PO2017655', '11.210.310.002', 'PD277筒身', '6500', '20', '50', '6550', '白件', '白件', '2017-6-30', '1', '碰伤', '9', null, '1');
INSERT INTO `orderinformation` VALUES ('de4495cf-ab89-4af3-8f21-b37e35502d02', '\"2017-05-15\"', '\"2017-06-19\"', '\"PO201752802\"', '\"11.210.310.225\"', '\"PD40筒头\"', '3500', '20', '10', '3520', '\"白件\"', '\"25.6二次加工\"', '\"2017-06-16\"', '1', '\"碰伤\"', '2.3', '\"6-2交货2000\"', '1');
INSERT INTO `orderinformation` VALUES ('f0dd146a-79ff-44cf-b372-2572553e39c5', '2017-6-20', '2017-6-28', 'PO20170566', '11.210.002.065', 'PD339筒尾', '1000', '20', '20', '1020', '白件', '白件', '2014-7-22', '1', '无', '5', '泛白', '1');
INSERT INTO `orderinformation` VALUES ('f100b9b2-3908-414a-a51d-4fbc7bef76c7', '2017-6-20', '2017-6-28', 'PO20170599', '11.210.002.060', 'PD759筒尾', '1000', '20', '20', '1050', '白件', '白件良品', '2014-7-22', '1', '无', '5', '泛白碰伤', '1');
INSERT INTO `orderinformation` VALUES ('f2d38fa3-8767-4486-a200-91a7346adcc3', '2017-05-23', '2017-06-21', 'PO201752802', '11.210.310.225', 'PD188筒头', '3500', '20', '10', '3520', '白件', '25.6二次加工', '2017-06-16', '1', '碰伤', '2.3', '6-2交货2000', '1');
