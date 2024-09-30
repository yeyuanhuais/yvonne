<p>安装Yum Repository</p>
<p>wget https://repo.mysql.com//mysql80-community-release-el8-1.noarch.rpm</p>
<p>使用rpm来安装MySQL</p>
<p>rpm -ivh mysql80-community-release-el8-1.noarch.rpm</p>
<p>使用yum安装mysql服务</p>
<p>&nbsp;</p>
<p>yum install mysql-server&nbsp; &nbsp; &nbsp; (Is this ok [y/N]: y)</p>
<p><strong>检查是否已经设置为开机启动MySQL服务</strong><br />[root@localhost ~]# systemctl list-unit-files|grep mysqld<br />mysqld.service disabled<br />mysqld@.service disabled</p>
<p>[root@localhost ~]# systemctl enable mysqld.service&nbsp; &nbsp;#设置开机启动<br />Created symlink /etc/systemd/system/multi-user.target.wants/mysqld.service &rarr; /usr/lib/systemd/system/mysqld.service.<br />[root@localhost ~]# systemctl list-unit-files|grep mysqld<br />mysqld.service enabled<br />mysqld@.service disabled</p>
<p>[root@localhost ~]# ps -ef|grep mysql # 查看是否启动MySQL服务<br />root 4311 32702 0 21:07 pts/4 00:00:00 grep --color=auto mysql<br />[root@localhost ~]# systemctl start mysqld.service #启动服务</p>
<p>&nbsp;</p>
<p>初次启动mysql</p>
<p>[root@ecs-kc1-small-1-linux-20200810093149 ~]# mysql</p>
<p>&nbsp;mysql&gt; alter user 'root'@'localhost' identified by '123456';</p>
<p>&nbsp;</p>
<p>配置远程登录</p>
<p>mysql&gt; create user 'root'@'%' identified by '123456';<br />Query OK, 0 rows affected (0.03 sec)</p>
<p>mysql&gt; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';<br />Query OK, 0 rows affected (0.01 sec)</p>
<p>mysql&gt; FLUSH PRIVILEGES;<br />Query OK, 0 rows affected (0.00 sec)</p>