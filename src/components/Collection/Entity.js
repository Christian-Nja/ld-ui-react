import React, { useContext } from 'react';

import ThemeContext from './config';

const NO_MESSAGE = '';

export default function Entity(props) {
    const THEME = useContext(ThemeContext);

    const flexFlow = props.entity.depiction
        ? { flexFlow: 'column' }
        : { flexFlow: 'row' };

    return (
        <article className={'entity-container'}>
            <div
                className={`entity-content ${props.class.entityContent}`}
                style={{ ...THEME.style.entityContent, ...flexFlow }}
            >
                {props.entity.depiction ? (
                    <figure>
                        <img
                            src={props.entity.depiction}
                            className={`entity-image ${props.class.entityImage}`}
                            style={THEME.style.entityImage}
                        ></img>
                    </figure>
                ) : (
                    <THEME.itemIcon
                        message={NO_MESSAGE}
                        iconClassName={'collectionIcon'}
                        descriptionClassName={'descriptionIcon'}
                    ></THEME.itemIcon>
                )}
                {/* <div
                    style={THEME.style.entityLabel}
                    className={`${props.class.entityLabel}`}
                >
                    {props.entity.entityLabel}
                </div> */}
            </div>
        </article>
    );
}

Entity.defaultProps = {
    class: {
        entityImage: '',
        entityLabel: '',
        entityContent: '',
    },
};
