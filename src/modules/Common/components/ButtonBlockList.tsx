import React from 'react';
import classNames from 'classnames';
import s from './ButtonBlockList.module.css';

type ButtonBlocListProps = {
  className?: string;
  subTitle: string;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonBlocList: React.FC<ButtonBlocListProps> = ({
  children,
  subTitle,
  title,
  className,
  ...props
}) => {
  return (
    <div className={classNames(s.buttonBlockList, className)} {...props}>
      <div className={classNames(s.buttonBlockList_header)}>
        <div className={classNames(s.buttonBlockList_subtitle, 'text__smallcaps')}>{subTitle}</div>
        <h2 className={classNames(s.buttonBlockList_title)}>{title}</h2>
      </div>
      <div className={classNames(s.buttonBlockList_items)}>{children}</div>
    </div>
  );
};

export default ButtonBlocList;
