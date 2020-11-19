import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
  } = rootStore.profileStore;
  const [editFormMode, setEditFormMode] = useState(false);
    return (
        <Tab.Pane>
        <Grid>
          <Grid.Column width={16}>
            <Header floated="left" icon="user" content={`About ${profile!.displayName}`} />
            {isCurrentUser && (
              <Button
                floated="right"
                basic
                content={editFormMode ? "Cancel" : "Edit Profile"}
                onClick={() => setEditFormMode(!editFormMode)}
              />
            )}
          </Grid.Column>
          <Grid.Column width={16}>
            {editFormMode ? (
              <ProfileEditForm />
            ) : (
              <span>{profile!.bio}</span>
            )}
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    )
}

export default observer(ProfileDescription)
