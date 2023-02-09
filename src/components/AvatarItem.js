import React from 'react';
import { ListItem, Avatar, Divider } from '@react-native-material/core'
{ /* https://www.react-native-material.com/docs/components/list-item */ }

export default function AvatarItem({avatar}) {




 
    
    return (
        <ListItem
            // onPress={() => getMembers()}
            leadingMode="avatar"
            leading={
                <Avatar label={avatar.name} />
                // <Avatar image={{ uri: avatar.avatar_url }} />
            }
            title={avatar.name}
            secondaryText={avatar.subtitle}
            overline={avatar.overline}
            meta={avatar.meta}
        />
    );
}

