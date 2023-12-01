<?php
    require 'koneksi.php';
    $input = file_get_contents('php://input');
    $data = json_decode($input,true);
    //terima data dari mobile
    $nama=trim($data['nama']);
    $visit_date=$data['visit_date'];
    $purpose = trim($data['purpose']);
    http_response_code(201);
    if($nama!=''){
    $query = mysqli_query($koneksi,"insert into guestbook(nama,visit_date,purpose) values('$nama','$visit_date','$purpose')");
    $pesan = true;
    }else{
    $pesan = false;
    }
    echo json_encode($pesan);
    echo mysqli_error($koneksi);
?>