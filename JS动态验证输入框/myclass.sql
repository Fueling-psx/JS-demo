/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50612
Source Host           : 127.0.0.1:3306
Source Database       : myclass

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2017-05-02 21:33:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classtwo
-- ----------------------------
DROP TABLE IF EXISTS `classtwo`;
CREATE TABLE `classtwo` (
  `﻿id` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(20) NOT NULL,
  `xh` char(10) NOT NULL,
  `xm` varchar(15) NOT NULL,
  `gender` enum('男','女') NOT NULL,
  PRIMARY KEY (`﻿id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classtwo
-- ----------------------------
INSERT INTO `classtwo` VALUES ('1', '13级网络工程2班', '1308093076', '孙大众', '男');
INSERT INTO `classtwo` VALUES ('42', '14级网络工程1班', '1408093038', '刘异', '男');
INSERT INTO `classtwo` VALUES ('3', '14级网络工程1班', '1408093006', '陈文龙', '男');
INSERT INTO `classtwo` VALUES ('4', '14级网络工程1班', '1408093008', '陈志威', '男');
INSERT INTO `classtwo` VALUES ('5', '14级网络工程1班', '1408093012', '方茜茜', '女');
INSERT INTO `classtwo` VALUES ('6', '14级网络工程1班', '1408093013', '封梅丽', '女');
INSERT INTO `classtwo` VALUES ('7', '14级网络工程1班', '1408093015', '高琴', '女');
INSERT INTO `classtwo` VALUES ('8', '14级网络工程1班', '1408093016', '郭雅杰', '女');
INSERT INTO `classtwo` VALUES ('9', '14级网络工程1班', '1408093017', '郝国坤', '男');
INSERT INTO `classtwo` VALUES ('10', '14级网络工程1班', '1408093019', '胡忠民', '男');
INSERT INTO `classtwo` VALUES ('11', '14级网络工程1班', '1408093021', '黄金涛', '男');
INSERT INTO `classtwo` VALUES ('12', '14级网络工程1班', '1408093024', '黄铉', '男');
INSERT INTO `classtwo` VALUES ('13', '14级网络工程1班', '1408093025', '蒋宏', '女');
INSERT INTO `classtwo` VALUES ('14', '14级网络工程1班', '1408093030', '廖义', '男');
INSERT INTO `classtwo` VALUES ('15', '14级网络工程1班', '1408093033', '刘慧', '女');
INSERT INTO `classtwo` VALUES ('16', '14级网络工程1班', '1408093036', '刘叶', '女');
INSERT INTO `classtwo` VALUES ('17', '14级网络工程1班', '1408093039', '龙志成', '男');
INSERT INTO `classtwo` VALUES ('18', '14级网络工程1班', '1408093040', '罗丹', '女');
INSERT INTO `classtwo` VALUES ('19', '14级网络工程1班', '1408093042', '潘新利', '女');
INSERT INTO `classtwo` VALUES ('20', '14级网络工程1班', '1408093043', '彭博', '男');
INSERT INTO `classtwo` VALUES ('21', '14级网络工程2班', '1408093044', '彭超', '男');
INSERT INTO `classtwo` VALUES ('22', '14级网络工程2班', '1408093046', '彭双喜', '男');
INSERT INTO `classtwo` VALUES ('23', '14级网络工程2班', '1408093047', '秦文芳', '女');
INSERT INTO `classtwo` VALUES ('24', '14级网络工程2班', '1408093049', '舒童', '女');
INSERT INTO `classtwo` VALUES ('25', '14级网络工程2班', '1408093050', '唐慧', '女');
INSERT INTO `classtwo` VALUES ('26', '14级网络工程2班', '1408093051', '唐金巧', '女');
INSERT INTO `classtwo` VALUES ('27', '14级网络工程2班', '1408093054', '涂佛敏', '女');
INSERT INTO `classtwo` VALUES ('28', '14级网络工程2班', '1408093061', '吴彩花', '女');
INSERT INTO `classtwo` VALUES ('29', '14级网络工程2班', '1408093062', '吴刘星', '女');
INSERT INTO `classtwo` VALUES ('30', '14级网络工程2班', '1408093066', '熊梦颖', '女');
INSERT INTO `classtwo` VALUES ('31', '14级网络工程2班', '1408093071', '杨柳', '女');
INSERT INTO `classtwo` VALUES ('32', '14级网络工程2班', '1408093076', '张晓涌', '男');
INSERT INTO `classtwo` VALUES ('33', '14级网络工程2班', '1408093077', '张禹', '男');
INSERT INTO `classtwo` VALUES ('34', '14级网络工程2班', '1408093078', '张志田', '男');
INSERT INTO `classtwo` VALUES ('35', '14级网络工程2班', '1408093079', '赵宜康', '男');
INSERT INTO `classtwo` VALUES ('36', '14级网络工程2班', '1408093080', '郑敏', '女');
INSERT INTO `classtwo` VALUES ('37', '14级网络工程2班', '1408093082', '钟悟晨', '男');
INSERT INTO `classtwo` VALUES ('38', '14级网络工程2班', '1408093083', '庄宗清', '男');
INSERT INTO `classtwo` VALUES ('39', '14级网络工程2班', '1408093084', '宗勤勤', '女');
INSERT INTO `classtwo` VALUES ('40', '14级网络工程2班', '1408095013', '赖道龙', '男');
INSERT INTO `classtwo` VALUES ('41', '14级网络工程2班', '1408095045', '熊白鸽', '女');

-- ----------------------------
-- Table structure for classtwo_choose
-- ----------------------------
DROP TABLE IF EXISTS `classtwo_choose`;
CREATE TABLE `classtwo_choose` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `xh` char(10) NOT NULL,
  `riqi` varchar(10) NOT NULL,
  `grade` enum('D','C','B','A') NOT NULL DEFAULT 'D',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classtwo_choose
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userno` varchar(255) DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `status` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'init', '123456', '1');
INSERT INTO `user` VALUES ('2', 'peng', '123456', '1');
INSERT INTO `user` VALUES ('3', 'xi', '123456', '1');

-- ----------------------------
-- View structure for classtwo_all
-- ----------------------------
DROP VIEW IF EXISTS `classtwo_all`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost`  VIEW `classtwo_all` AS SELECT a.xh, a.xm, b.times FROM classtwo a JOIN classtwo_tongji b ON a.xh = b.xh ;

-- ----------------------------
-- View structure for classtwo_choose_name
-- ----------------------------
DROP VIEW IF EXISTS `classtwo_choose_name`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost`  VIEW `classtwo_choose_name` AS SELECT a.xh,a.xm,b.riqi,b.grade FROM classtwo a,classtwo_choose b WHERE a.xh = b.xh ;

-- ----------------------------
-- View structure for classtwo_tongji
-- ----------------------------
DROP VIEW IF EXISTS `classtwo_tongji`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `classtwo_tongji` AS select xh,count(*) times from classtwo group by xh ;
