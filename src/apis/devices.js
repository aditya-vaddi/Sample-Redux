import Settings from '../store/setUp';
const settings = Settings.load();

export function getDeviceList(action) {
     const state={};
     return(
          fetch(settings.getDevicesURL, {
              method  : 'GET',
              headers : { 'Content-Type': 'application/json' }
          })
          .then(response =>
                response.json()
                .then(json => {
                    if (!response.ok)
                        return Promise.reject(json);
                    else
                        return Promise.resolve(json);
                })
                .catch(function(error) {
                    return state.error=error;
                })
          )
     );
};
