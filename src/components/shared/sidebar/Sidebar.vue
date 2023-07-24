<template>
  <div>    
    <b-sidebar 
      backdrop
      backdrop-variant="dark"
      bg-variant="dark"
      id="sidebar-1"
      no-header 
      sidebar-class="sidebarPosition"
      text-variant="light"
      width="250px" 
      shadow>

      <b-nav v-if="software=='mtwserver'" vertical class="w-100">
        <b-nav-item to="/group"> <b-icon-files></b-icon-files> {{$i18n.t('groups')}} </b-nav-item>
        <b-nav-item to="/equipment"> <b-icon-collection></b-icon-collection> {{$i18n.t('equipments')}} </b-nav-item>
        
        <b-dropdown-divider/>
        
        <b-nav-item to="/lpr">         
          <b-iconstack>
            <b-icon stacked icon="bounding-box-circles"></b-icon>
            <b-icon stacked icon="badge-ad"></b-icon>  
          </b-iconstack> 
          {{$i18n.t('lprs')}} 
        </b-nav-item>
        <b-nav-item to="/origin"> 
          <b-icon  icon="distribute-horizontal"/>
          {{$i18n.t('origin')}}
        </b-nav-item>

        <b-nav-item to="/visitor"> 
          <b-icon  icon="person-plus"/> 
          {{$i18n.t('visitors')}} 
        </b-nav-item>

        <b-nav-item to="/permanent"> 
          <b-icon  icon="person-check"/>
          {{$i18n.t('permanents')}}
        </b-nav-item>

        <b-nav-item to="/profile"> 
          <b-icon  icon="file-person"/>
          {{$i18n.t('profiles')}}
        </b-nav-item>

        <b-nav-item to="/record"> 
          <b-icon  icon="film"/>
          {{$i18n.t('records')}}
        </b-nav-item>


        <b-nav-item to="/restrictedPlate"> 
          <b-iconstack>
            <b-icon stacked icon="x-circle"></b-icon>
            <b-icon stacked icon="badge-ad"></b-icon>  
          </b-iconstack>
          {{$i18n.t('restrictedPlates')}} 
        </b-nav-item>

        <b-nav-item to="/schedule"> 
          <b-icon  icon="calendar3"/>
          {{$i18n.t('schedules')}}
        </b-nav-item>

        <b-nav-item to="/telemetry">      
          <b-iconstack>
            <b-icon stacked icon="thermometer" shift-h="-5"></b-icon>
            <b-icon stacked icon="speedometer2" shift-h="3" ></b-icon>  
          </b-iconstack> 
          {{$i18n.t('telemetry')}} 
        </b-nav-item>

        <b-nav-item to="/vehicle"> 
          <b-icon  icon="truck"/>
          {{$i18n.t('vehicles')}} 
        </b-nav-item>

        <b-nav-item to="/dvcs">
          <b-iconstack>
            <b-icon stacked icon="window"></b-icon>
            <b-icon stacked icon="camera-video-fill" scale="0.57" shift-v="-2"></b-icon>
          </b-iconstack> {{$i18n.t('dvcs')}}
        </b-nav-item>
      </b-nav>



      <b-nav v-if="software=='lprdata'" vertical class="w-100">>
        <b-nav-item to="/visitor"> <b-icon  icon="person-plus"></b-icon> {{$i18n.t('visitors')}} </b-nav-item>
        <b-nav-item to="/permanent"> <b-icon  icon="person-check"></b-icon> {{$i18n.t('permanents')}} </b-nav-item>
        <b-nav-item v-if="$session.get('privilege') == 'admin'" to="/history"> 
          <b-icon icon="clock-history"></b-icon> {{$i18n.t('history')}}</b-nav-item>
        <b-nav-item to="/restrictedPlate"> 
          <b-iconstack>
            <b-icon stacked icon="badge-ar"></b-icon>
            <b-icon stacked icon="slash-lg" rotate="20" scale="0.9"></b-icon>
            <b-icon stacked icon="slash-lg" rotate="-110" scale="0.9"></b-icon>
          </b-iconstack>
          {{$i18n.t('restrictedPlates')}} 
        </b-nav-item>
        <b-nav-item to="/plate"> 
          <b-iconstack>
            <b-icon stacked icon="badge-ar"></b-icon>
            <b-icon stacked icon="reception0" shift-v="9" ></b-icon>
            <b-icon stacked icon="reception0" shift-v="2" ></b-icon>
          </b-iconstack>
          {{$i18n.t('plates')}} 
        </b-nav-item>
        
      </b-nav>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    props: {
      software: {
        type: String,
        default: "mtwserver",
      } ,
      
      origin: true, 
      history: true,
    },
  }

</script>

<style>

.sidebarPosition {
  top: 3.5rem !important;
}
</style>

<style lang="scss" scoped>

.nav-item a {
  color: aliceblue;
  text-align: left;
  padding: 1.2em;

  &:hover {
    text-decoration: none;
    color: burlywood;
    
  }
}
</style>