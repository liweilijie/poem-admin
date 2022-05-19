ALTER TABLE `his_medicinal` DROP FOREIGN KEY `fk_medicinal_medicinal_1`;

DROP INDEX `unique_cate_name` ON `his_medicinal`;
DROP INDEX `index_name` ON `his_medicinal`;
DROP INDEX `unique_name` ON `his_category`;

DROP TABLE `his_medicinal`;
DROP TABLE `his_category`;

CREATE TABLE `his_medicinal` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
`category_id` int(11) UNSIGNED NOT NULL COMMENT '类目id',
`name` varchar(255) NOT NULL COMMENT '名字',
`batch_number` varchar(255) NULL COMMENT '批号',
`spec` varchar(255) NULL COMMENT '规格',
`count` varchar(255) NULL COMMENT '数量',
`validity` date NOT NULL COMMENT '药品有效期',
`status` char(1) NULL DEFAULT 0,
`created_by` varchar(32) NOT NULL,
`updated_by` varchar(32) NULL,
`created_at` datetime NULL,
`updated_at` datetime NULL,
`deleted_at` datetime NULL,
PRIMARY KEY (`id`) ,
UNIQUE INDEX `unique_cate_name` (`category_id` ASC, `name` ASC, `created_by` ASC) USING BTREE,
INDEX `index_name` (`name` ASC) USING BTREE
);
CREATE TABLE `his_category` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL COMMENT '类目名称',
`created_by` varchar(32) NOT NULL,
`updated_by` varchar(32) NULL,
`created_at` datetime NULL,
`updated_at` datetime NULL,
`deleted_at` datetime NULL,
PRIMARY KEY (`id`) ,
UNIQUE INDEX `unique_name` (`name` ASC, `created_by` ASC) USING BTREE
);

ALTER TABLE `his_medicinal` ADD CONSTRAINT `fk_medicinal_medicinal_1` FOREIGN KEY (`category_id`) REFERENCES `his_category` (`id`);


insert  into `his_category`(`name`, `created_by`) values
                                                      ('测试类目1', '037CB9TOL43PKHVYD0S5DHLFS'),
                                                      ('测试类目2', '037CB9TOL43PKHVYD0S5DHLFS'),
                                                      ('测试类目3', '037CB9TOL43PKHVYD0S5DHLFS');

insert into `his_medicinal`(`category_id`,`name`,`batch_number`,`spec`,`count`,`validity`,`status`,`created_by`) values
                                                                                                                     (1, 'N98口罩', '20200914', '2020-01k023', '800只', '2022-10-11', 0, '037CB9TOL43PKHVYD0S5DHLFS'),
                                                                                                                     (2, '普通口罩', '20220914', '2020-01k023', '900只', '2022-12-11', 0, '037CB9TOL43PKHVYD0S5DHLFS'),
                                                                                                                     (3, '绑带', '20230914', '2023-01k023', '90片', '2022-07-10', 0, '037CB9TOL43PKHVYD0S5DHLFS');
