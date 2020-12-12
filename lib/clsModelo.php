<?php
	require_once "clsConfig.php";	
	class Modelo
	{
		protected $_db;
		protected $_conn;
		
		public function __construct()
		{
			$this->_db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
			
			if( $this->_db->connect_errno )
			{
				//echo "Fallo al conectar a MySQL: ". $this->_db->connect_error;
				echo "Algo salio mal";
				echo '<META HTTP-EQUIV=Refresh CONTENT="1; URL=../uid/error/index.html">';
				die();
				return;
			}
			
			$this->_db->set_charset(DB_CHARSET);
            
            $this->_conn = new mysqli(DB_HOST2, DB_USER2, DB_PASS2, DB_NAME2);
			
			if( $this->_conn->connect_errno )
			{
				//echo "Fallo al conectar a MySQL: ". $this->_db->connect_error;
				echo "Algo salio mal";
				echo '<META HTTP-EQUIV=Refresh CONTENT="1; URL=../uid/error/index.html">';
				die();
				return;
			}
			
			$this->_conn->set_charset(DB_CHARSET);
		}
	}