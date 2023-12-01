<?php
    require 'koneksi.php';
    $input = file_get_contents('php://input');
    $data = json_decode($input,true);
    //terima data dari mobile
    $id=trim($data['id']);
    $nama=trim($data['nama']);
    $visit_date=$data['visit_date'];
    $purpose = trim($data['purpose']);
    http_response_code(201);
    if($nama!=''){
    $query = mysqli_query($koneksi,"update guestbook set nama='$nama',visit_date='$visit_date',purpose='$purpose' where
    id='$id'");
    $pesan = true;
    }else{
    $pesan = false;
    }
    echo json_encode($pesan);
    echo mysqli_error($koneksi);
?>