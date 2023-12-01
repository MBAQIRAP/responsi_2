import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.page.html',
  styleUrls: ['./guestbook.page.scss'],
})
export class GuestbookPage implements OnInit {

  constructor(public _apiService: ApiService, private modal:ModalController) { }
  dataGuestBook: any = [];
  modal_tambah = false;
  id: any;
  nama: any;
  visit_date: any;
  purpose: any;

  ngOnInit() {
    this.getGuestBook();
  }

  getGuestBook() {
    this._apiService.tampil('tampil.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataGuestBook = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
    }

    reset_model() {
      this.id = null;
      this.nama = '';
      this.visit_date = '';
      this.purpose = '';
      }

      open_modal_tambah(isOpen: boolean) {
        this.modal_tambah = isOpen;
        this.reset_model();
        this.modal_tambah = true;
        this.modal_edit = false;
        }

        cancel() {
          this.modal.dismiss();
          this.modal_tambah = false;
          this.reset_model();
          }

          tambahGuestBook() {
            if (this.nama != '' && this.visit_date != '' && this.purpose!='') {
            let data = {
            nama: this.nama,
            visit_date: this.visit_date,
            purpose: this.purpose,
            }
            this._apiService.tambah(data, '/tambah.php')
            .subscribe({
            next: (hasil: any) => {
            this.reset_model();
            console.log('berhasil tambah guest book');
            this.getGuestBook();
            this.modal_tambah = false;
            this.modal.dismiss();
            },
            error: (err: any) => {
            console.log('gagal tambah guest book');
            }
            })
            } else {
            console.log('gagal tambah guest book karena masih ada data yg kosong');
            }
            }

            hapusGuestBook(id: any) {
              this._apiService.hapus(id,
              '/hapus.php?id=').subscribe({
              next: (res: any) => {
              console.log('sukses', res);
              this.getGuestBook();
              console.log('berhasil hapus data');
              },
              error: (error: any) => {
              console.log('gagal');
              }
              })
              }

              ambilGuestBook(id: any) {
                this._apiService.lihat(id,
                '/lihat.php?id=').subscribe({
                next: (hasil: any) => {
                console.log('sukses', hasil);
                let guestbook = hasil;
                this.id = guestbook.id;
                this.nama = guestbook.nama;
                this.visit_date = guestbook.visit_date;
                this.purpose = guestbook.purpose;
                },
                error: (error: any) => {
                console.log('gagal ambil data');
                }
                })
                }
                modal_edit = false;

                open_modal_edit(isOpen: boolean, idget: any) {
                  this.modal_edit = isOpen;
                  this.id = idget;
                  console.log(this.id);
                  this.ambilGuestBook(this.id);
                  this.modal_tambah = false;
                  this.modal_edit = true;
                  }
                  editGuestBook() {
                    let data = {
                    id: this.id,
                    nama: this.nama,
                    visit_date: this.visit_date,
                    purpose: this.purpose
                    }
                    this._apiService.edit(data, '/edit.php')
                    .subscribe({
                    next: (hasil: any) => {
                    console.log(hasil);
                    this.reset_model();
                    this.getGuestBook();
                    console.log('berhasil edit guest book');
                    this.modal_edit = false;
                    this.modal.dismiss();
                    },
                    error: (err: any) => {
                    console.log('gagal edit guest book');
                    }
                    })
                    }



}
