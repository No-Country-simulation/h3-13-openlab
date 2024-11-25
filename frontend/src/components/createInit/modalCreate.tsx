import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/Initiatives/createIniSlice';
import { RootState } from '../../store/store';
import { addCircle, close, tickCircle } from '../../assets';
import useWindowSize from '../hooks/Responsive';

const ModalCreate = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.create.isOpen);
  const { width } = useWindowSize();

  const isMobile = width <= 768; 
 if (!isOpen) return null;

  const handleCreate = () => {
    alert("Creado");
    dispatch(closeModal()); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
   
      <div className={`bg-white rounded shadow-lg ${isMobile ? 'w-full h-[500px]' : 'w-[964px] h-[678px]'} flex flex-col gap-4`}>
        
        
        <div className='flex flex-row justify-between items-center p-6'>
          <h1 className='text-3xl font-semibold mt-4 ml-5'>{isMobile ? 'Create Initiative' : 'New Initiative'}</h1>
          <button onClick={() => dispatch(closeModal())} className='p-2'>
            <img src={close} alt="close" />
          </button>
        </div> 

        
        <div className='flex flex-col gap-4 items-center justify-around'>
          
          <div className={`flex flex-col gap-3 ${isMobile ? 'w-full px-5' : 'ml-5'}`}>
            <h1 className='text-sm font-bold m-2'>Image</h1>
            <div className="relative inline-block">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ width: '109px', height: '92px' }} 
              />
              <img
                src={addCircle}
                alt="Upload"
                className="object-cover p-8 rounded-lg shadow-sm border"
              />
            </div>

            <div>
              <h1 className='text-sm font-bold m-2'>Name</h1>
              <input type="text" className="border w-[406px] h-[40px] p-2 rounded shadow-sm text-sm" placeholder='Name'/>
            </div>
            <div>
              <h1 className='text-sm font-bold m-2'>Idea</h1>
              <textarea className="border w-[406px] h-[143px] p-2 rounded shadow-sm text-sm" placeholder='Idea'></textarea>
            </div>
          </div>

          <div className={`flex flex-col gap-3 ${isMobile ? 'w-full px-5' : 'mr-5'}`}>
            <div>
              <h1 className='text-sm font-bold m-2'>Problem</h1>
              <textarea className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm" placeholder='Problem'/>
            </div>
            <div>
              <h1 className='text-sm font-bold m-2'>Opportunity</h1>
              <textarea className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm" placeholder='Opportunity'/>
            </div>
            <div>
              <h1 className='text-sm font-bold m-2'>Solution</h1>
              <textarea className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm" placeholder='Solution'/>
            </div>
          </div>
        </div>

        
        <div className={`flex items-center justify-center text-white text-base font-semibold mt-5 ${isMobile ? 'w-full px-5' : ''}`}>
          <button className='flex flex-row bg-[#3D7BFF] w-[894px] h-[45px] justify-center items-center rounded-lg'
            onClick={handleCreate}>
            <img src={tickCircle} className='mr-2' />
            {isMobile ? 'Create on Mobile' : 'Create Dao'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
