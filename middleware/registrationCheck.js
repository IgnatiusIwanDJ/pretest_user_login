import Swal from 'sweetalert2'

export default function ({ store, redirect }) {
  if (!store.state.toVerify) {
    Swal.fire({
      title: 'Data registrasi belum terisi',
      icon: 'error',
      timer: 2000,
      confirmButtonText: 'Tutup',
    })
    return redirect('/')
  }
}
