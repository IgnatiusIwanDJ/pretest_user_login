import Swal from 'sweetalert2'

export default function ({ store, redirect }) {
  if (!store.state.authToken) {
    Swal.fire({
      title: 'Token tidak berlaku',
      icon: 'error',
      timer: 2000,
      confirmButtonText: 'Tutup',
    })
    return redirect('/')
  }
}
