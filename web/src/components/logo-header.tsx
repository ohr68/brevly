import logo from '../assets/Logo.svg'

export function LogoHeader () {
  return (
    <div className='flex w-full justify-start py-6'>
      <img src={logo} height={24} width={97} alt='Logo' />
    </div>
  )
}
